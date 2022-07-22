import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

import RoundTable from "./RoundTable";

const strokes = {
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
};

const putts = {
  hole1: 1,
  hole2: 1,
  hole3: 1,
  hole4: 1,
  hole5: 1,
  hole6: 1,
  hole7: 1,
  hole8: 1,
  hole9: 1,
  hole10: 1,
  hole11: 1,
  hole12: 1,
  hole13: 1,
  hole14: 1,
  hole15: 1,
  hole16: 1,
  hole17: 1,
  hole18: 1,
};

const pars = {
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
  total: 72,
};

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <RoundTable
          roundId={1}
          courseName="Test Course"
          tournamentDate="2022-01-01"
          strokes={strokes}
          putts={putts}
          totalStrokes={72}
          totalPutts={22}
          pars={pars}
        />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <RoundTable
          roundId={1}
          courseName="Test Course"
          tournamentDate="2022-01-01"
          strokes={strokes}
          putts={putts}
          totalStrokes={72}
          totalPutts={22}
          pars={pars}
        />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("display table heads", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <RoundTable
          roundId={1}
          courseName="Test Course"
          tournamentDate="2022-01-01"
          strokes={strokes}
          putts={putts}
          totalStrokes={72}
          totalPutts={22}
          pars={pars}
        />
      </UserProvider>
    </MemoryRouter>
  );

  const holesTH = screen.getByText("HOLE");
  expect(holesTH).toBeInTheDocument();
  const parsTH = screen.getByText("PAR");
  expect(parsTH).toBeInTheDocument();
  const strokesTH = screen.getByText("STROKES");
  expect(strokesTH).toBeInTheDocument();
  const puttsTH = screen.getByText("PUTTS");
  expect(puttsTH).toBeInTheDocument();
});
