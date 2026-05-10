import type { ReactElement } from "react";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";

import Favourites from "../../components/Favourites";

const filmsFixture = [
  { episode_id: 4, title: "A New Hope", release_date: "1977-05-25" },
  {
    episode_id: 5,
    title: "The Empire Strikes Back",
    release_date: "1980-05-17",
  },
];

const charactersFixture = [
  { name: "Luke Skywalker", gender: "male" },
  { name: "Darth Vader", gender: "male" },
];

function mockFilmsAndPeopleApis() {
  vi.spyOn(globalThis, "fetch").mockImplementation((input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    if (url.includes("/films")) {
      return Promise.resolve(
        new Response(JSON.stringify(filmsFixture), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    if (url.includes("/people")) {
      return Promise.resolve(
        new Response(JSON.stringify(charactersFixture), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    return Promise.reject(new Error(`Unexpected fetch: ${url}`));
  });
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

function renderFavourites(ui: ReactElement) {
  const client = createTestQueryClient();
  return render(
    <PrimeReactProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </PrimeReactProvider>
  );
}

describe("Favourites", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("shows loading while films and characters are loading", async () => {
    let resolveFilms!: (value: Response) => void;
    let resolvePeople!: (value: Response) => void;
    const filmsPending = new Promise<Response>((res) => {
      resolveFilms = res;
    });
    const peoplePending = new Promise<Response>((res) => {
      resolvePeople = res;
    });

    vi.spyOn(globalThis, "fetch").mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url.includes("/films")) return filmsPending;
      if (url.includes("/people")) return peoplePending;
      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });

    renderFavourites(<Favourites />);

    expect(screen.getByText("Loading favourites…")).toBeInTheDocument();

    const jsonHeaders = { "Content-Type": "application/json" };
    resolveFilms(
      new Response(JSON.stringify(filmsFixture), { status: 200, headers: jsonHeaders })
    );
    resolvePeople(
      new Response(JSON.stringify(charactersFixture), { status: 200, headers: jsonHeaders })
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading favourites…")).not.toBeInTheDocument();
    });
  });

  it("shows empty messages when nothing is favourited", async () => {
    mockFilmsAndPeopleApis();
    renderFavourites(<Favourites />);

    await waitFor(() => {
      expect(screen.getByText("No favourite films yet.")).toBeInTheDocument();
    });
    expect(screen.getByText("No favourite characters yet.")).toBeInTheDocument();
  });

  it("lists favourited films from localStorage", async () => {
    localStorage.setItem("film-liked-1", "true");
    mockFilmsAndPeopleApis();
    renderFavourites(<Favourites />);

    await waitFor(() => {
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
    });
    expect(screen.queryByText("The Empire Strikes Back")).not.toBeInTheDocument();
  });

  it("lists favourited characters from localStorage", async () => {
    localStorage.setItem("character-liked-Luke Skywalker", "true");
    mockFilmsAndPeopleApis();
    renderFavourites(<Favourites />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });
    expect(screen.queryByText("Darth Vader")).not.toBeInTheDocument();
  });

  it("shows error UI when the films request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url.includes("/films")) {
        return Promise.reject(new Error("network"));
      }
      return Promise.resolve(
        new Response(JSON.stringify(charactersFixture), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    renderFavourites(<Favourites />);

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Try again later.")
      ).toBeInTheDocument();
    });
  });
});
