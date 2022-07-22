import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HolesRow from "./HolesRow";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <HolesRow updatePath="/courses/pebble-beach/edit" />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <HolesRow updatePath="/courses/pebble-beach/edit" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays", function () {
  render(
    <MemoryRouter>
      <HolesRow />
    </MemoryRouter>
  );

  const row = screen.getByRole("row");
  expect(row).toBeInTheDocument();

  const holeTableHeader = screen.getByText("HOLE");
  expect(holeTableHeader).toBeInTheDocument();

  const totalTableHeader = screen.getByText("TOT");
  expect(totalTableHeader).toBeInTheDocument();
});
