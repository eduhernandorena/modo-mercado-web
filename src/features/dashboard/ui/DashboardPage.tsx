import { Card } from "../../../components/Card";
import { colors, spacing, typography, fontWeight } from "../../../components/tokens";

export function DashboardPage() {
  return (
    <main style={{ padding: spacing.lg, maxWidth: "1200px", margin: "0 auto" }}>
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
          Dashboard
        </h1>
        <p
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.base,
            color: colors.gray[600],
            marginTop: spacing.xs,
          }}
        >
          Visão geral dos seus dados
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: spacing.lg, marginBottom: spacing.lg }}>
        <Card>
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
              Total de Produtos
            </p>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize["3xl"],
                fontWeight: fontWeight.bold,
                color: colors.gray[900],
                margin: 0,
                marginTop: spacing.sm,
              }}
            >
              0
            </p>
          </div>
        </Card>

        <Card>
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
              Listas de Compras
            </p>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize["3xl"],
                fontWeight: fontWeight.bold,
                color: colors.gray[900],
                margin: 0,
                marginTop: spacing.sm,
              }}
            >
              0
            </p>
          </div>
        </Card>

        <Card>
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
              Registros de Preço
            </p>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize["3xl"],
                fontWeight: fontWeight.bold,
                color: colors.gray[900],
                margin: 0,
                marginTop: spacing.sm,
              }}
            >
              0
            </p>
          </div>
        </Card>

        <Card>
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
              Economia Total
            </p>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize["3xl"],
                fontWeight: fontWeight.bold,
                color: colors.success[600],
                margin: 0,
                marginTop: spacing.sm,
              }}
            >
              R$ 0,00
            </p>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: spacing.lg }}>
        <Card>
          <h3
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.lg,
              fontWeight: fontWeight.semibold,
              color: colors.gray[900],
              margin: 0,
              marginBottom: spacing.md,
            }}
          >
            Atividade Recente
          </h3>
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              color: colors.gray[600],
              margin: 0,
            }}
          >
            Nenhuma atividade recente
          </p>
        </Card>

        <Card>
          <h3
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.lg,
              fontWeight: fontWeight.semibold,
              color: colors.gray[900],
              margin: 0,
              marginBottom: spacing.md,
            }}
          >
            Ações Rápidas
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.base,
                color: colors.gray[600],
                margin: 0,
              }}
            >
              Comece adicionando produtos para começar a acompanhar preços
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
