import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { PageEmpty, PageError, PageLoading } from "../../components/QueryStates";

describe("QueryStates", () => {
  it("shows loading label and accessible spinner", () => {
    render(<PageLoading label="Loading films…" />);
    expect(screen.getByLabelText("Loading films…")).toBeInTheDocument();
    expect(screen.getByText("Loading films…")).toBeInTheDocument();
  });

  it("renders empty state title and optional detail", () => {
    render(
      <PageEmpty
        title="No films match your search"
        detail='Try a different term than “Death Star”.'
      />
    );
    expect(screen.getByText("No films match your search")).toBeInTheDocument();
    expect(
      screen.getByText('Try a different term than “Death Star”.')
    ).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<PageError message="Network error." />);
    expect(screen.getByText("Network error.")).toBeInTheDocument();
  });
});
