"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#f48fb1", // Pink
    },
    error: {
      main: "#f44336", // Red
    },
    background: {
      default: "#0a0a0a", // Very dark background
      paper: "#1e1e1e", // Slightly lighter for surfaces
    },
  },
  cssVariables: true,
});

export default theme;
