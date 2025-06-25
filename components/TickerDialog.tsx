import { useDebounce } from "@/hooks/useDebounce";
import { searchAllTickers } from "@/lib/polygon";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Ticker } from "@/types";
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
  const addTicker = usePortfolioStore((s) => s.addTicker);
  const [tickerSymbolInput, setTickerSymbolInput] = React.useState("");
  const [tickerOptions, setTickerOptions] = React.useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = React.useState<Ticker | null>(
    null
  );

  const debouncedTickerSymbol = useDebounce(tickerSymbolInput, 1000);

  const reset = () => {
    setTickerSymbolInput("");
    setTickerOptions([]);
  };

  const handleAddTicker = () => {
    if (!!selectedTicker) {
      addTicker(portfolioId, selectedTicker);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    const handleSearch = async () => {
      const tickerResponse = await searchAllTickers(debouncedTickerSymbol);

      // Due to duplicates showing up (see results for AAXJ),
      // we include the last_updated_utc field to ensure uniqueness
      const newTickerOptions =
        tickerResponse.results.map((ticker) => {
          return {
            ticker: ticker.ticker,
            name: ticker.name,
            lastUpdated: ticker.last_updated_utc,
          };
        }) || [];
      setTickerOptions(newTickerOptions);
    };
    handleSearch();
  }, [debouncedTickerSymbol]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Ticker</DialogTitle>
      <DialogContent>
        <Autocomplete
          // freeSolo
          options={tickerOptions} // This should be replaced with the actual fetched tickers
          getOptionLabel={(option) =>
            `${option.ticker} - ${option.name} - ${option.lastUpdated}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Ticker"
              variant="outlined"
              fullWidth
            />
          )}
          onChange={(event, newValue) => {
            if (
              typeof newValue === "object" &&
              newValue !== null &&
              "ticker" in newValue
            ) {
              setSelectedTicker(newValue);
            } else {
              setSelectedTicker(null); // or handle error
            }
          }}
          onInputChange={(event, newValue) => {
            setTickerSymbolInput(newValue);
          }}
          inputValue={tickerSymbolInput}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleAddTicker}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
