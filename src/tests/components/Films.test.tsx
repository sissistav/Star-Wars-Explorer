import type { ReactElement } from "react";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";

import Films from "../../components/Films";
import { useSearchStore } from "../../store/searchStore";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function renderFilms(ui: ReactElement) {
  const client = createTestQueryClient();
  return render(
    <PrimeReactProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </PrimeReactProvider>
  );
}

describe("Films", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useSearchStore.setState({ search: "" });
  });

  it("shows loading while fetch is pending", async () => {
    let resolve!: (value: Response) => void;
    const pending = new Promise<Response>((res) => {
      resolve = res;
    });
    vi.spyOn(globalThis, "fetch").mockImplementation(() => pending);

    renderFilms(<Films />);

    expect(screen.getByText("Loading films…")).toBeInTheDocument();

    resolve(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading films…")).not.toBeInTheDocument();
    });
  });

  it("shows empty state when API returns no films", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    renderFilms(<Films />);

    await waitFor(() => {
      expect(screen.getByText("No films available")).toBeInTheDocument();
    });
  });

  it("renders film titles after load", async () => {
    const films = [
      {
        episode_id: 4,
        title: "A New Hope",
        release_date: "1977-05-25",
      },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(films), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    renderFilms(<Films />);

    await waitFor(() => {
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
  });

  it("filters by search from the store", async () => {
    useSearchStore.setState({ search: "empire" });
    const films = [
      { episode_id: 4, title: "A New Hope", release_date: "1977-05-25" },
      {
        episode_id: 5,
        title: "The Empire Strikes Back",
        release_date: "1980-05-17",
      },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(films), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    renderFilms(<Films />);

    await waitFor(() => {
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    });
    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
  });
});
