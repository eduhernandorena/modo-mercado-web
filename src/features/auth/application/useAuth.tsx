import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";
import type { Provider } from "@supabase/supabase-js";
import { supabase } from "../../../core/http/supabaseClient";

export type AuthUser = { id: string; email: string | null };

export function mapAuthUser(input: { id: string; email?: string | null }): AuthUser {
  return { id: input.id, email: input.email ?? null };
}

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = PropsWithChildren<{
  initialUser?: AuthUser | null;
}>;

function toAuthUser(sessionUser: { id: string; email?: string | null } | undefined): AuthUser | null {
  if (!sessionUser) {
    return null;
  }
  return mapAuthUser(sessionUser);
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(initialUser ?? null);
  const [loading, setLoading] = useState(initialUser === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialUser !== undefined) {
      return;
    }

    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) {
        return;
      }
      setUser(toAuthUser(data.session?.user));
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAuthUser(session?.user));
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [initialUser]);

  const clearError = useCallback(() => setError(null), []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    clearError();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      throw signInError;
    }
  }, [clearError]);

  const signInWithProvider = useCallback(async (provider: Provider) => {
    clearError();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (signInError) {
      setError(signInError.message);
      throw signInError;
    }
  }, [clearError]);

  const signOut = useCallback(async () => {
    clearError();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      throw signOutError;
    }
    setUser(null);
  }, [clearError]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      clearError,
      signInWithEmail,
      signInWithProvider,
      signOut
    }),
    [user, loading, error, clearError, signInWithEmail, signInWithProvider, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
