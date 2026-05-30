import { describe, expect, it } from "vitest";
import { enqueueOperation } from "./syncQueue";

describe("syncQueue", () => {
  it("enfileira operacao com metadados obrigatorios", async () => {
    const op = await enqueueOperation({
      entity: "products",
      action: "create",
      payload: { id: "p1", nome: "Leite" }
    });
    expect(op.operationId).toBeTruthy();
    expect(op.entity).toBe("products");
  });
});
