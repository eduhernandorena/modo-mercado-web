import { useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { colors, spacing, typography, fontWeight } from "../../../components/tokens";

interface ShoppingList {
  id: string;
  nome: string;
  created_at: string;
}

export function ListsPage() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("synced");

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: ShoppingList = {
      id: crypto.randomUUID(),
      nome: newListName,
      created_at: new Date().toISOString(),
    };

    setLists([...lists, newList]);
    setNewListName("");
    setIsModalOpen(false);
    setSyncStatus("syncing");

    // Simulate sync
    setTimeout(() => setSyncStatus("synced"), 1000);
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
            Listas de Compras
          </h1>
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              color: colors.gray[600],
              marginTop: spacing.xs,
            }}
          >
            Crie e gerencie suas listas de compras
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
          <span
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              color: syncStatus === "synced" ? colors.success[600] : colors.gray[500],
            }}
            aria-label="status-sync"
          >
            {syncStatus === "synced" ? "Sincronizado" : syncStatus === "syncing" ? "Sincronizando..." : "Offline"}
          </span>
          <Button onClick={() => setIsModalOpen(true)}>Nova lista</Button>
        </div>
      </div>

      {lists.length === 0 ? (
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
              Você ainda não tem listas de compras
            </p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline">
              Criar primeira lista
            </Button>
          </div>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: spacing.md }}>
          {lists.map((list) => (
            <Card key={list.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  {list.nome}
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
                  Criada em {new Date(list.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver itens
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Lista">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <Input
            label="Nome da lista"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Ex: Feira semanal"
            fullWidth
          />
          <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateList} disabled={!newListName.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
