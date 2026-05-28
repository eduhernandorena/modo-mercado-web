import { Route, Routes } from "react-router-dom";
import { AuthProvider, type AuthUser } from "../features/auth/application/useAuth";
import { LoginPage } from "../features/auth/ui/LoginPage";
import { ProtectedRoute } from "../features/auth/ui/ProtectedRoute";

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
      </Routes>
    </AuthProvider>
  );
}
