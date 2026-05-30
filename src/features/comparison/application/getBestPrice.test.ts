import { describe, expect, it } from "vitest";
import { getBestPriceMarketId } from "./getBestPrice";

describe("getBestPriceMarketId", () => {
  it("retorna mercado de menor preco", () => {
    const result = getBestPriceMarketId([
      { marketId: "m1", price: 12.5 },
      { marketId: "m2", price: 10.9 }
    ]);
    expect(result).toBe("m2");
  });
});
