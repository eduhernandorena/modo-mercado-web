import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../application/useAuth";

export function LoginPage() {
  const { user, loading, error, clearError, signInWithEmail, signInWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    clearError();

    try {
      await signInWithEmail(email.trim(), password);
    } catch {
      // error state is handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProviderLogin(provider: "google" | "apple") {
    setSubmitting(true);
    clearError();

    try {
      await signInWithProvider(provider);
    } catch {
      // error state is handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Entrar</h1>
      <p>Use sua conta para acessar o Modo Mercado.</p>

      <form onSubmit={handleEmailSubmit} aria-label="login-email-senha">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={submitting}
          style={{ display: "block", width: "100%", marginBottom: "0.75rem" }}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={submitting}
          style={{ display: "block", width: "100%", marginBottom: "0.75rem" }}
        />

        <button type="submit" disabled={submitting}>
          Entrar com e-mail e senha
        </button>
      </form>

      <div style={{ marginTop: "1rem", display: "grid", gap: "0.5rem" }}>
        <button type="button" disabled={submitting} onClick={() => void handleProviderLogin("google")}>
          Continuar com Google
        </button>
        <button type="button" disabled={submitting} onClick={() => void handleProviderLogin("apple")}>
          Continuar com Apple
        </button>
      </div>

      {error ? (
        <p role="alert" style={{ color: "#b42318", marginTop: "1rem" }}>
          {error}
        </p>
      ) : null}
    </main>
  );
}
