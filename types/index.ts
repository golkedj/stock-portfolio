export type Ticker = {
  ticker: string;
  name: string;
  lastUpdated?: string;
};

export type Portfolio = {
  id: string;
  name: string;
  tickers: Ticker[];
};
