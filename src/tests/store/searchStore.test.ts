import { describe, it, expect, beforeEach } from "vitest";

import { useSearchStore } from "../../store/searchStore";

describe("searchStore", () => {
  beforeEach(() => {
    useSearchStore.setState({ search: "" });
  });

  it("starts with empty search", () => {
    expect(useSearchStore.getState().search).toBe("");
  });

  it("setSearch updates the query", () => {
    useSearchStore.getState().setSearch("Luke");
    expect(useSearchStore.getState().search).toBe("Luke");
  });

  it("clearSearch resets the query", () => {
    useSearchStore.getState().setSearch("Vader");
    useSearchStore.getState().clearSearch();
    expect(useSearchStore.getState().search).toBe("");
  });
});
