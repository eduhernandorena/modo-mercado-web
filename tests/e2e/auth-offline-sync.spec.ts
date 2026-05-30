import { test, expect } from "@playwright/test";

test("usuario loga, cria item offline e sincroniza ao voltar online", async ({ page, context }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Continuar com Google" }).click();
  await context.setOffline(true);
  await page.getByRole("button", { name: "Nova lista" }).click();
  await page.getByLabel("Nome da lista").fill("Feira");
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Feira")).toBeVisible();
  await context.setOffline(false);
  await expect(page.getByText("Sincronizado")).toBeVisible();
});
