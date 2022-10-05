import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CalculationsAccordion from "./CalculationsAccordion";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <CalculationsAccordion />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CalculationsAccordion />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("displays the calculations accordion buttons", async function () {
  render(
    <MemoryRouter>
      <CalculationsAccordion />
    </MemoryRouter>
  );

  const totalStrokesBtn = screen.getByText("Total Strokes");
  expect(totalStrokesBtn).toBeInTheDocument();

  const scoreDifferentialBtn = screen.getByText("Score Differential");
  expect(scoreDifferentialBtn).toBeInTheDocument();

  const handicapIndexBtn = screen.getByText("Handicap Index");
  expect(handicapIndexBtn).toBeInTheDocument();

  const courseHandicapBtn = screen.getByText("Course Handicap");
  expect(courseHandicapBtn).toBeInTheDocument();

  const netStrokesBtn = screen.getByText("Net Strokes");
  expect(netStrokesBtn).toBeInTheDocument();
});
