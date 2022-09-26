import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

import StandingsTable from "./StandingsTable";

const pointsLeaderboard = [
  {
    username: "happy-gilmore",
    firstName: "Happy",
    lastName: "Gilmore",
    participation: "3",
    putts: "6",
    strokes: "25",
    greenies: "4",
    pars: "9",
    birdies: "8",
    eagles: "0",
    aces: "0",
    total: "55",
  },
  {
    username: "shooter-mcgavin",
    firstName: "Shooter",
    lastName: "McGavin",
    participation: "3",
    putts: "4",
    strokes: "20",
    greenies: "3",
    pars: "4",
    birdies: "0",
    eagles: "0",
    aces: "0",
    total: "34",
  },
  {
    username: "chubbs-peterson",
    firstName: "Chubbs",
    lastName: "Peterson",
    participation: "3",
    putts: "2",
    strokes: "15",
    greenies: "3",
    pars: "0",
    birdies: "0",
    eagles: "0",
    aces: "0",
    total: "23",
  },
];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <StandingsTable data={pointsLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <StandingsTable data={pointsLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays standings table", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <StandingsTable data={pointsLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );

  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();

  const posTableHead = screen.getByText("POS");
  expect(posTableHead).toBeInTheDocument();

  const playerTableHead = screen.getByText("PLAYER");
  expect(playerTableHead).toBeInTheDocument();

  const totalTableHead = screen.getByText("TOT");
  expect(totalTableHead).toBeInTheDocument();
});
