import { useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import { colors, spacing, typography, fontWeight } from "../../../components/tokens";

interface MarketPrice {
  marketId: string;
  marketName: string;
  price: number;
}

export function ComparisonPage() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [bestMarket, setBestMarket] = useState<string | null>(null);

  const handleCompare = () => {
    if (!selectedProduct.trim()) return;

    // Simulate fetching market prices
    const mockPrices: MarketPrice[] = [
      { marketId: "m1", marketName: "Carrefour", price: 12.50 },
      { marketId: "m2", marketName: "Extra", price: 10.90 },
      { marketId: "m3", marketName: "Dia", price: 9.75 },
      { marketId: "m4", marketName: "Pão de Açúcar", price: 11.20 },
    ];

    setMarketPrices(mockPrices);

    // Find best price market
    const sorted = [...mockPrices].sort((a, b) => a.price - b.price);
    setBestMarket(sorted[0].marketId);
  };

  return (
    <main style={{ padding: spacing.lg, maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: spacing.lg }}>
        <h1
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize["3xl"],
            fontWeight: fontWeight.bold,
            color: colors.gray[900],
            margin: 0,
          }}
        >
          Comparação de Preços
        </h1>
        <p
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.base,
            color: colors.gray[600],
            marginTop: spacing.xs,
          }}
        >
          Compare preços entre diferentes mercados
        </p>
      </div>

      <Card style={{ marginBottom: spacing.lg }}>
        <div style={{ display: "flex", gap: spacing.md, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Produto"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              placeholder="Ex: Leite integral 1L"
              fullWidth
            />
          </div>
          <Button onClick={handleCompare} disabled={!selectedProduct.trim()}>
            Comparar
          </Button>
        </div>
      </Card>

      {marketPrices.length > 0 && (
        <div style={{ display: "grid", gap: spacing.md }}>
          <h2
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.xl,
              fontWeight: fontWeight.semibold,
              color: colors.gray[900],
              margin: 0,
            }}
          >
            Resultados para: {selectedProduct}
          </h2>

          {marketPrices.map((item) => (
            <Card
              key={item.marketId}
              variant={item.marketId === bestMarket ? "default" : "outlined"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: item.marketId === bestMarket ? `2px solid ${colors.success[500]}` : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
                <div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.fontSize.lg,
                      fontWeight: fontWeight.semibold,
                      color: colors.gray[900],
                      margin: 0,
                    }}
                  >
                    {item.marketName}
                  </h3>
                  {item.marketId === bestMarket && (
                    <p
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.fontSize.sm,
                        fontWeight: fontWeight.medium,
                        color: colors.success[600],
                        margin: 0,
                        marginTop: spacing.xs,
                      }}
                    >
                      Melhor preço
                    </p>
                  )}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize["2xl"],
                    fontWeight: fontWeight.bold,
                    color: item.marketId === bestMarket ? colors.success[600] : colors.gray[900],
                    margin: 0,
                  }}
                >
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </Card>
          ))}

          <Card style={{ backgroundColor: colors.primary[50] }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.sm,
                    fontWeight: fontWeight.medium,
                    color: colors.gray[600],
                    margin: 0,
                  }}
                >
                  Economia potencial
                </p>
                <p
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.base,
                    color: colors.gray[500],
                    margin: 0,
                    marginTop: spacing.xs,
                  }}
                >
                  Comparando o mais caro com o mais barato
                </p>
              </div>
              <p
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.fontSize["2xl"],
                  fontWeight: fontWeight.bold,
                  color: colors.success[600],
                  margin: 0,
                }}
              >
                R$ {(marketPrices[0].price - marketPrices[marketPrices.length - 1].price).toFixed(2)}
              </p>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
