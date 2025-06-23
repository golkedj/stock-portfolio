"use client";

import { Portfolio, Ticker } from "@/types";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function PortfolioCard({
  portfolio,
  ticker,
}: {
  portfolio: Portfolio;
  ticker: Ticker;
}) {
  const removeTicker = usePortfolioStore((s) => s.removeTicker);

  return (
    <Card>
      <CardContent>
        {/* TODO: Implement Ticker Card */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{ticker.ticker}</Typography>
          <Button
            color="error"
            onClick={() => removeTicker(portfolio.id, ticker.ticker)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
