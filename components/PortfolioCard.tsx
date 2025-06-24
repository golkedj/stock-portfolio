"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Portfolio } from "@/types";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import PortfolioCardName from "./PortfolioCardName";
import TickerCard from "./TickerCard";
import TickerDialog from "./TickerDialog";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const removePortfolio = usePortfolioStore((s) => s.removePortfolio);
  const [tickerDialogOpen, setTickerDialogOpen] = React.useState(false);

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <PortfolioCardName portfolio={portfolio} />
          <Button color="error" onClick={() => removePortfolio(portfolio.id)}>
            Delete
          </Button>
        </Stack>
        {portfolio.tickers.length > 0 ? (
          <Stack spacing={1} mt={2} mb={2}>
            {portfolio.tickers.map((t) => (
              <TickerCard key={t.ticker} ticker={t} portfolio={portfolio} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={1} mt={2} mb={2}>
            <Typography variant="body2" color="text.secondary">
              No tickers added yet.
            </Typography>
          </Stack>
        )}
        <Button
          variant="text"
          onClick={() => {
            setTickerDialogOpen(true);
          }}
        >
          + Add Ticker
        </Button>
        <TickerDialog
          open={tickerDialogOpen}
          onClose={() => setTickerDialogOpen(false)}
          portfolioId={portfolio.id}
        />
      </CardContent>
    </Card>
  );
}
