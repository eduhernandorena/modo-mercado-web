import { useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { colors, spacing, typography, fontWeight } from "../../../components/tokens";

interface Product {
  id: string;
  nome: string;
  created_at: string;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = () => {
    if (!newProductName.trim()) return;

    const newProduct: Product = {
      id: crypto.randomUUID(),
      nome: newProductName,
      created_at: new Date().toISOString(),
    };

    setProducts([...products, newProduct]);
    setNewProductName("");
    setIsModalOpen(false);
  };

  return (
    <main style={{ padding: spacing.lg, maxWidth: "800px", margin: "0 auto" }}>
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
            Produtos
          </h1>
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              color: colors.gray[600],
              marginTop: spacing.xs,
            }}
          >
            Gerencie seu catálogo de produtos
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Novo produto</Button>
      </div>

      <div style={{ marginBottom: spacing.lg }}>
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>

      {filteredProducts.length === 0 ? (
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
              {searchTerm ? "Nenhum produto encontrado" : "Você ainda não tem produtos cadastrados"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsModalOpen(true)} variant="outline">
                Cadastrar primeiro produto
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: spacing.md }}>
          {filteredProducts.map((product) => (
            <Card key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  {product.nome}
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
                  Cadastrado em {new Date(product.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div style={{ display: "flex", gap: spacing.sm }}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="ghost" size="sm" style={{ color: colors.error[600] }}>
                  Excluir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Produto">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <Input
            label="Nome do produto"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Ex: Leite integral"
            fullWidth
          />
          <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateProduct} disabled={!newProductName.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
