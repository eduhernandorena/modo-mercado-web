import { describe, expect, it } from "vitest";
import { shouldCacheRequest } from "./sw";

describe("shouldCacheRequest", () => {
  it("cacheia GET para assets estaticos", () => {
    expect(shouldCacheRequest("GET", "/assets/app.js")).toBe(true);
  });
});
