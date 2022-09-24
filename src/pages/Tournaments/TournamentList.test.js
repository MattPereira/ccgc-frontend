import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import TournamentList from "./TournamentList";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <TournamentList />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <TournamentList />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("initially displays the loading spinner", async function () {
  render(
    <MemoryRouter initialEntries={["/tournaments/2021-11-20"]}>
      <UserProvider>
        <TournamentList />
      </UserProvider>
    </MemoryRouter>
  );

  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
