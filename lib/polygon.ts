import { restClient } from "@polygon.io/client-js";

const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);

export async function searchAllTickers(search: string) {
  const response = await rest.reference.tickers({
    search,
    limit: 100,
  });
  return response;
}

export async function getTickerSnapshot(ticker: string) {
  const response = await rest.stocks.snapshotTicker(ticker);
  return response;
}

export async function fetchTickerSparkline(ticker: string): Promise<number[]> {
  const DAYS_TO_FETCH = 14; // Fetch 14 days to account for weekends and holidays
  const DAYS_TO_RETURN = 7; // Return the last 7 days of closing prices

  const now = new Date();
  const endDate = now.toISOString().split("T")[0];
  const startDate = new Date(now.setDate(now.getDate() - DAYS_TO_FETCH))
    .toISOString()
    .split("T")[0];

  const aggregates = await rest.stocks.aggregates(
    ticker,
    1,
    "day",
    startDate,
    endDate,
    {
      adjusted: "true",
      sort: "asc",
      limit: DAYS_TO_FETCH,
    }
  );

  console.log("aggregates", aggregates);

  const results = aggregates.results !== undefined ? aggregates.results : [];

  const closingPrices = results.map((r) => r.c || 0);

  return closingPrices.slice(-DAYS_TO_RETURN);
}
