import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "./router";

describe("AppRouter", () => {
  it("renderiza rota raiz", () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Modo Mercado Web")).toBeInTheDocument();
  });
});
