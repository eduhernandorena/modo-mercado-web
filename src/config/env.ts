type RequiredEnvKey = "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY";

const REQUIRED_ENV_KEYS: RequiredEnvKey[] = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY"
];

function getMissingKeys(): RequiredEnvKey[] {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = import.meta.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

export function validateEnv(): void {
  const missingKeys = getMissingKeys();

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(", ")}. ` +
        "Create modo_mercado_web/.env based on modo_mercado_web/.env.example."
    );
  }
}

export const env = {
  get supabaseUrl(): string {
    return import.meta.env.VITE_SUPABASE_URL;
  },
  get supabaseAnonKey(): string {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
};
