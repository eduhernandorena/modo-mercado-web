export function getBestPriceMarketId(items: Array<{ marketId: string; price: number }>) {
  if (items.length === 0) return null;
  return [...items].sort((a, b) => a.price - b.price)[0].marketId;
}
