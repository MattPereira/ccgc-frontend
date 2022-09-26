import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CourseTable from "./CourseTable";

const pars = {
  hole1: 3,
  hole2: 4,
  hole3: 5,
  hole4: 3,
  hole5: 4,
  hole6: 5,
  hole7: 3,
  hole8: 4,
  hole9: 5,
};

const handicaps = {
  hole1: 1,
  hole2: 2,
  hole3: 3,
  hole4: 4,
  hole5: 5,
  hole6: 6,
  hole7: 7,
  hole8: 8,
  hole9: 9,
};

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <CourseTable pars={pars} handicaps={handicaps} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CourseTable pars={pars} handicaps={handicaps} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays table rows for holes, pars, and handicaps", function () {
  render(
    <MemoryRouter>
      <CourseTable pars={pars} handicaps={handicaps} />
    </MemoryRouter>
  );

  const holeRowHeader = screen.getByText("HOLE");
  expect(holeRowHeader).toBeInTheDocument();

  const parRowHeader = screen.getByText("PAR");
  expect(parRowHeader).toBeInTheDocument();

  const handicapRowHeader = screen.getByText("HCP");
  expect(handicapRowHeader).toBeInTheDocument();
});
