"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Button, Typography, Stack } from "@mui/material";
import PortfolioCard from "@/components/PortfolioCard";

export default function HomePage() {
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const addPortfolio = usePortfolioStore((state) => state.addPortfolio);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Stock Portfolio Tracker
      </Typography>
      <Button
        variant="contained"
        onClick={() => addPortfolio(`Portfolio ${portfolios.length + 1}`)}
      >
        + Create New Portfolio
      </Button>
      <Stack spacing={2} mt={2}>
        {portfolios.map((p) => (
          <PortfolioCard key={p.id} portfolio={p} />
        ))}
      </Stack>
    </div>
  );
}
