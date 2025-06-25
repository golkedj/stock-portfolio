"use client";

import { fetchTickerSparkline, getTickerSnapshot } from "@/lib/polygon";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Portfolio, Ticker } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

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

  return (
    <Card elevation={3}>
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
                <AreaChart
                  data={sparklineData.map((val, i) => ({ x: i, y: val }))}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="sparklineGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#90caf9" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#90caf9"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke="#90caf9"
                    fill="url(#sparklineGradient)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
