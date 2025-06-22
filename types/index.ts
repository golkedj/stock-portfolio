export type Ticker = {
  symbol: string;
  companyName?: string;
  price?: number;
  change?: number;
  sparkline?: number[];
};

export type Portfolio = {
  id: string;
  name: string;
  tickers: Ticker[];
};
