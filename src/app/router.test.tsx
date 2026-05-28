import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "./router";

describe("AppRouter", () => {
  it("renderiza rota raiz quando autenticado", () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppRouter initialUser={{ id: "u1", email: "user@example.com" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Modo Mercado Web")).toBeInTheDocument();
  });

  it("redireciona para login quando nao autenticado", () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppRouter initialUser={null} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Entrar" })).toBeInTheDocument();
  });
});
