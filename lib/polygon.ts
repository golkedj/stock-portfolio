import { restClient } from "@polygon.io/client-js";

console.log("Polygon API Key:", process.env.NEXT_PUBLIC_POLYGON_API_KEY);
const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);

export async function searchAllTickers(search: string) {
  try {
    const response = await rest.reference.tickers({
      search,
      limit: 100, // Adjust limit as needed
    });
    console.log("Fetched tickers:", response);
    return response;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}
