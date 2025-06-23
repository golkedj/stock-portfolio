import { create } from "zustand";
import { Portfolio, Ticker } from "@/types";
import { nanoid } from "nanoid";

interface Store {
  portfolios: Portfolio[];
  addPortfolio: (name: string) => void;
  removePortfolio: (id: string) => void;
  editPortfolioName: (id: string, newName: string) => void;
  addTicker: (portfolioId: string, ticker: Ticker) => void;
  removeTicker: (portfolioId: string, tickerSymbol: string) => void;
}

export const usePortfolioStore = create<Store>((set) => ({
  portfolios: [],
  addPortfolio: (name) =>
    set((state) => ({
      portfolios: [...state.portfolios, { id: nanoid(), name, tickers: [] }],
    })),
  removePortfolio: (id) =>
    set((state) => ({
      portfolios: state.portfolios.filter((p) => p.id !== id),
    })),
  editPortfolioName: (id: string, newName: string) =>
    set((state) => ({
      portfolios: state.portfolios.map((p) =>
        p.id === id ? { ...p, name: newName } : p
      ),
    })),
  addTicker: (portfolioId, ticker: Ticker) =>
    set((state) => ({
      portfolios: state.portfolios.map((portfolio) => {
        if (portfolio.id === portfolioId) {
          return {
            ...portfolio,
            tickers: [...portfolio.tickers, ticker],
          };
        }
        return portfolio;
      }),
    })),
  removeTicker: (portfolioId: string, tickerSymbol: string) =>
    set((state) => ({
      portfolios: state.portfolios.map((portfolio) => {
        if (portfolio.id === portfolioId) {
          return {
            ...portfolio,
            tickers: portfolio.tickers.filter(
              (ticker) => ticker.ticker !== tickerSymbol
            ),
          };
        }
        return portfolio;
      }),
    })),
}));
