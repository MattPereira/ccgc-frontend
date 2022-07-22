import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GreenieCardList from "./GreenieCardList";

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
      <GreenieCardList greenies={greenies} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <GreenieCardList greenies={greenies} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays multiple greenie cards", function () {
  render(
    <MemoryRouter>
      <GreenieCardList greenies={greenies} />
    </MemoryRouter>
  );

  const happyCard = screen.getByText("Happy Gilmore");
  expect(happyCard).toBeInTheDocument();

  const shooterCard = screen.getByText("Shooter McGavin");
  expect(shooterCard).toBeInTheDocument();
});
