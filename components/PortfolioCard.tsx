"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Portfolio } from "@/types";
import { Button, Card, CardContent, Stack } from "@mui/material";
import PortfolioCardName from "./PortfolioCardName";
import TickerCard from "./TickerCard";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const removePortfolio = usePortfolioStore((s) => s.removePortfolio);

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <PortfolioCardName portfolio={portfolio} />
          <Button color="error" onClick={() => removePortfolio(portfolio.id)}>
            Delete
          </Button>
        </Stack>
        {/* TODO: Implement Ticker */}
        <Stack spacing={1} mt={2}>
          {portfolio.tickers.map((t) => (
            <TickerCard key={t.symbol} ticker={t} portfolioId={portfolio.id} />
          ))}
        </Stack>
        <Button
          variant="text"
          onClick={() => {
            /* open AddTickerDialog */
          }}
        >
          + Add Ticker
        </Button>
      </CardContent>
    </Card>
  );
}
