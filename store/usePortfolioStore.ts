import { create } from "zustand";
import { Portfolio } from "@/types";
import { nanoid } from "nanoid";

interface Store {
  portfolios: Portfolio[];
  addPortfolio: (name: string) => void;
  removePortfolio: (id: string) => void;
  editPortfolioName: (id: string, newName: string) => void;
  // ... more methods like addTicker, removeTicker
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
}));
