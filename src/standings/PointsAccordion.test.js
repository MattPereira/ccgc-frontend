import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PointsAccordion from "./PointsAccordion";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <PointsAccordion />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <PointsAccordion />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("displays the calculations accordion buttons", async function () {
  render(
    <MemoryRouter>
      <PointsAccordion />
    </MemoryRouter>
  );

  const strokesBtn = screen.getByText("Strokes");
  expect(strokesBtn).toBeInTheDocument();

  const puttsBtn = screen.getByText("Putts");
  expect(puttsBtn).toBeInTheDocument();

  const greeniesBtn = screen.getByText("Greenies");
  expect(greeniesBtn).toBeInTheDocument();

  const eventsBtn = screen.getByText("Events");
  expect(eventsBtn).toBeInTheDocument();
});
