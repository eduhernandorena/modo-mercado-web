import { Route, Routes } from "react-router-dom";
import { AuthProvider, type AuthUser } from "../features/auth/application/useAuth";
import { LoginPage } from "../features/auth/ui/LoginPage";
import { ProtectedRoute } from "../features/auth/ui/ProtectedRoute";
import { ProductsPage } from "../features/products/ui/ProductsPage";
import { RecordsPage } from "../features/records/ui/RecordsPage";
import { ListsPage } from "../features/lists/ui/ListsPage";
import { DashboardPage } from "../features/dashboard/ui/DashboardPage";
import { ComparisonPage } from "../features/comparison/ui/ComparisonPage";

function HomePage() {
  return <h1>Modo Mercado Web</h1>;
}

type AppRouterProps = {
  initialUser?: AuthUser | null;
};

export function AppRouter({ initialUser }: AppRouterProps = {}) {
  return (
    <AuthProvider initialUser={initialUser}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <RecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <ListsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comparison"
          element={
            <ProtectedRoute>
              <ComparisonPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
