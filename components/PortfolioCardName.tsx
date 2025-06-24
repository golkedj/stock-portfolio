import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Portfolio } from "@/types";
import { Typography } from "@mui/material";
import React from "react";

export default function PortfolioCardName({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const editPortfolioName = usePortfolioStore((s) => s.editPortfolioName);

  const [name, setName] = React.useState(portfolio.name);
  const [editingName, setEditingName] = React.useState(false);

  const finishEditing = () => {
    setEditingName(false);
    editPortfolioName(portfolio.id, name);
  };

  if (editingName) {
    return (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={finishEditing}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            finishEditing();
          }
        }}
        autoFocus
        style={{
          fontSize: "1.25rem",
          fontWeight: 500,
          border: "none",
          background: "transparent",
          outline: "none",
          width: "100%",
        }}
      />
    );
  }

  return (
    <Typography
      variant="h6"
      onClick={() => setEditingName(true)}
      style={{ cursor: "pointer" }}
    >
      {name}
    </Typography>
  );
}
