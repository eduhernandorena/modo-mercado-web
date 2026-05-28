import { describe, expect, it } from "vitest";
import { mapAuthUser } from "./useAuth";

describe("mapAuthUser", () => {
  it("normaliza user autenticado", () => {
    const user = mapAuthUser({ id: "u1", email: "a@b.com" });
    expect(user).toEqual({ id: "u1", email: "a@b.com" });
  });

  it("define email como null quando ausente", () => {
    const user = mapAuthUser({ id: "u1" });
    expect(user).toEqual({ id: "u1", email: null });
  });
});
