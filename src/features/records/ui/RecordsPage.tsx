import { useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { colors, spacing, typography, fontWeight } from "../../../components/tokens";

interface PriceRecord {
  id: string;
  product_id: string;
  market_id: string;
  product_name: string;
  market_name: string;
  price: number;
  created_at: string;
}

export function RecordsPage() {
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreateRecord = () => {
    if (!productName.trim() || !marketName.trim() || !price) return;

    const newRecord: PriceRecord = {
      id: crypto.randomUUID(),
      product_id: crypto.randomUUID(),
      market_id: crypto.randomUUID(),
      product_name: productName,
      market_name: marketName,
      price: parseFloat(price),
      created_at: new Date().toISOString(),
    };

    setRecords([newRecord, ...records]);
    setProductName("");
    setMarketName("");
    setPrice("");
    setIsModalOpen(false);
  };

  return (
    <main style={{ padding: spacing.lg, maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
        <div>
          <h1
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize["3xl"],
              fontWeight: fontWeight.bold,
              color: colors.gray[900],
              margin: 0,
            }}
          >
            Registros de Preço
          </h1>
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              color: colors.gray[600],
              marginTop: spacing.xs,
            }}
          >
            Registre e acompanhe preços de produtos
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Novo registro</Button>
      </div>

      {records.length === 0 ? (
        <Card>
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.base,
                color: colors.gray[600],
                marginBottom: spacing.md,
              }}
            >
              Você ainda não tem registros de preço
            </p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline">
              Registrar primeiro preço
            </Button>
          </div>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: spacing.md }}>
          {records.map((record) => (
            <Card key={record.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                    {record.product_name}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.fontSize.sm,
                      color: colors.gray[500],
                      margin: 0,
                      marginTop: spacing.xs,
                    }}
                  >
                    {record.market_name} • {new Date(record.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.fontSize["2xl"],
                      fontWeight: fontWeight.bold,
                      color: colors.primary[600],
                      margin: 0,
                    }}
                  >
                    R$ {record.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Registro de Preço">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <Input
            label="Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ex: Leite integral"
            fullWidth
          />
          <Input
            label="Mercado"
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            placeholder="Ex: Carrefour"
            fullWidth
          />
          <Input
            label="Preço (R$)"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            fullWidth
          />
          <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRecord} disabled={!productName.trim() || !marketName.trim() || !price}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
