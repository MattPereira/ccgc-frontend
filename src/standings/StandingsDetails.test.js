import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import StandingsDetails from "./StandingsDetails";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <StandingsDetails />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <StandingsDetails />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("initially displays the loading spinner", async function () {
  render(
    <MemoryRouter>
      <StandingsDetails />
    </MemoryRouter>
  );

  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
