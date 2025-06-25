import { restClient } from "@polygon.io/client-js";

console.log("Polygon API Key:", process.env.NEXT_PUBLIC_POLYGON_API_KEY);
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
// export async function getTickerSnapshot(ticker: string) {
//   const response = await rest.stocks.trades(ticker, {
//     order: "asc",
//     limit: 10,
//     sort: "timestamp",
//   });
//   return response;
// }
