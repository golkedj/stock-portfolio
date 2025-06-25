"use client";

import { Portfolio, Ticker } from "@/types";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useEffect, useState } from "react";
import { getTickerSnapshot } from "@/lib/polygon";

export default function PortfolioCard({
  portfolio,
  ticker,
}: {
  portfolio: Portfolio;
  ticker: Ticker;
}) {
  const removeTicker = usePortfolioStore((s) => s.removeTicker);

  const [price, setPrice] = useState<number | null>(null);
  const [prevClose, setPrevClose] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getTickerSnapshot(ticker.ticker);
      const prevClose = data.ticker?.prevDay?.c || null;
      const price = data.ticker?.day?.c || null;
      const resolvedPrice = price && price > 0 ? price : prevClose;
      setPrice(resolvedPrice);
      setPrevClose(prevClose);
    }
    loadData();
  }, [ticker]);

  const change =
    price !== null && prevClose !== null ? price - prevClose : null;
  const changePercent =
    change !== null && prevClose ? (change / prevClose) * 100 : null;
  const changeDirection =
    change && change > 0 ? "▲" : change && change < 0 ? "▼" : "";
  const changeColor =
    change && change > 0
      ? "success.main"
      : change && change < 0
      ? "error.main"
      : "text.secondary";

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            {ticker.ticker}
            {ticker.name ? ` — ${ticker.name}` : ""}
          </Typography>
          <Button
            color="error"
            onClick={() => removeTicker(portfolio.id, ticker.ticker)}
          >
            Delete
          </Button>
        </Stack>
        <Stack spacing={0.5} mt={2}>
          <Typography variant="body1">
            <strong>Price:</strong> ${price?.toFixed(2)}
          </Typography>
          {change !== null && changePercent !== null && (
            <Typography variant="body2" color={changeColor}>
              <strong>Change:</strong> {changeDirection}{" "}
              {Math.abs(change).toFixed(2)} (
              {Math.abs(changePercent).toFixed(2)}%)
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
