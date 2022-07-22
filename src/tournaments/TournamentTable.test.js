import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

import TournamentTable from "./TournamentTable";

const strokesLeaderboard = [
  {
    id: 1,
    username: "happy-gilmore",
    firstName: "Happy",
    lastName: "Gilmore",
    courseHandicap: 7,
    totalStrokes: 72,
    points: 25,
    strokes: {
      hole1: 4,
      hole2: 4,
      hole3: 4,
      hole4: 4,
      hole5: 4,
      hole6: 4,
      hole7: 4,
      hole8: 4,
      hole9: 4,
      hole10: 4,
      hole11: 4,
      hole12: 4,
      hole13: 4,
      hole14: 4,
      hole15: 4,
      hole16: 4,
      hole17: 4,
      hole18: 4,
    },
  },
  {
    id: 1,
    username: "shooter-mcgavin",
    firstName: "Happy",
    lastName: "Gilmore",
    courseHandicap: 11,
    totalStrokes: 90,
    points: 20,
    strokes: {
      hole1: 5,
      hole2: 5,
      hole3: 5,
      hole4: 5,
      hole5: 5,
      hole6: 5,
      hole7: 5,
      hole8: 5,
      hole9: 5,
      hole10: 5,
      hole11: 5,
      hole12: 5,
      hole13: 5,
      hole14: 5,
      hole15: 5,
      hole16: 5,
      hole17: 5,
      hole18: 5,
    },
  },
];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <TournamentTable data={strokesLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <TournamentTable data={strokesLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays standings table", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <TournamentTable data={strokesLeaderboard} />
      </UserProvider>
    </MemoryRouter>
  );

  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();

  const tableHead = screen.getAllByRole("row", { hidden: true });
  expect(tableHead[0]).toBeInTheDocument();
});
