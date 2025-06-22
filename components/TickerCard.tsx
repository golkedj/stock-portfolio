"use client";

import { Portfolio } from "@/types";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const removePortfolio = usePortfolioStore((s) => s.removePortfolio);

  return (
    <Card>
      <CardContent>
        {/* TODO: Implement Ticker Card */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{portfolio.symbol}</Typography>
          <Button color="error" onClick={() => removePortfolio(portfolio.id)}>
            Delete
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {portfolio.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Shares: {portfolio.shares}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Price: ${portfolio.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
