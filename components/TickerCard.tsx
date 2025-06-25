"use client";

import { Portfolio, Ticker } from "@/types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useEffect, useState } from "react";
import { fetchTickerSparkline, getTickerSnapshot } from "@/lib/polygon";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

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

  const [sparklineData, setSparklineData] = useState<number[] | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getTickerSnapshot(ticker.ticker);
      const prevClose = data.ticker?.prevDay?.c || null;
      const price = data.ticker?.day?.c || null;
      const resolvedPrice = price && price > 0 ? price : prevClose;
      setPrice(resolvedPrice);
      setPrevClose(prevClose);

      const spark = await fetchTickerSparkline(ticker.ticker);
      console.log("sparkline", spark);
      setSparklineData(spark);
    }
    loadData();
  }, [ticker.ticker]);

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

  // TODO: Handle loading and error state
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
        <Stack direction="row" alignItems="center" spacing={2} mt={2}>
          <Stack spacing={0.5}>
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

          {sparklineData && sparklineData.length > 1 && (
            <Box sx={{ flexGrow: 1, height: 40 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sparklineData.map((val, i) => ({ x: i, y: val }))}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={false}
                  />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
