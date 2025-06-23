import { useDebounce } from "@/hooks/useDebounce";
import { searchAllTickers } from "@/lib/polygon";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";

export default function TickerDialog({
  open,
  onClose,
  portfolioId,
}: {
  open: boolean;
  onClose: () => void;
  portfolioId: string;
}) {
  const [tickerSymbolInput, setTickerSymbolInput] = React.useState("");
  const [tickerOptions, setTickerOptions] = React.useState<string[]>([]);

  const debouncedTickerSymbol = useDebounce(tickerSymbolInput, 1000);

  const handleAddTicker = () => {
    // Logic to add the ticker to the portfolio
    onClose();
  };

  useEffect(() => {
    console.log("Debounced ticker symbol:", debouncedTickerSymbol);
    const handleSearch = async () => {
      if (debouncedTickerSymbol) {
        // Logic to fetch ticker data based on debouncedTickerSymbol
        console.log(`Fetching data for ticker: ${debouncedTickerSymbol}`);
      }
      const tickerResponse = await searchAllTickers(debouncedTickerSymbol);
      console.log("Ticker response:", tickerResponse);
      const newTickerOptions = tickerResponse.results.map(
        (ticker) =>
          `${ticker.ticker} - ${ticker.name} - ${ticker.last_updated_utc}`
      );
      console.log("New ticker options:", newTickerOptions);
      setTickerOptions(newTickerOptions);
    };
    handleSearch();
  }, [debouncedTickerSymbol]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Ticker</DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo
          options={tickerOptions} // This should be replaced with the actual fetched tickers
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Ticker"
              variant="outlined"
              fullWidth
            />
          )}
          onInputChange={(event, newValue) => {
            setTickerSymbolInput(newValue);
          }}
          inputValue={tickerSymbolInput}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddTicker}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
