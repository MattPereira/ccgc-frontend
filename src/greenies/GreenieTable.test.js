import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GreenieTable from "./GreenieTable";

const greenies = [
  {
    id: 1,
    roundId: 1,
    holeNumber: 1,
    feet: 1,
    inches: 1,
    courseImg: null,
    courseName: "Lone Tree Golf Course",
    firstName: "Happy",
    lastName: "Gilmore",
    tournamentDate: "2022-01-01T08:00:00.000Z",
  },
  {
    id: 2,
    roundId: 2,
    holeNumber: 1,
    feet: 2,
    inches: 2,
    courseImg: null,
    courseName: "Lone Tree Golf Course",
    firstName: "Shooter",
    lastName: "McGavin",
    tournamentDate: "2022-01-01T08:00:00.000Z",
  },
];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <GreenieTable greenies={greenies} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <GreenieTable greenies={greenies} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays multiple greenie cards", function () {
  render(
    <MemoryRouter>
      <GreenieTable greenies={greenies} />
    </MemoryRouter>
  );

  const happyRow = screen.getByText("Happy G");
  expect(happyRow).toBeInTheDocument();

  const shooterRow = screen.getByText("Shooter M");
  expect(shooterRow).toBeInTheDocument();
});
