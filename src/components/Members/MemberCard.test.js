import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MemberCard from "./MemberCard";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <MemberCard
        username="Happy Gilmore"
        firstName="Happy"
        lastName="Gilmore"
        avgStrokes="77"
        avgPutts="22"
        avgGreenies="1.11"
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <MemberCard
        username="Happy Gilmore"
        firstName="Happy"
        lastName="Gilmore"
        avgStrokes="77"
        avgPutts="22"
        avgGreenies="1.11"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays member card with average strokes, putts, and greenies", function () {
  render(
    <MemoryRouter>
      <MemberCard
        username="Happy Gilmore"
        firstName="Happy"
        lastName="Gilmore"
        avgStrokes="77"
        avgPutts="22"
        avgGreenies="1.11"
      />
    </MemoryRouter>
  );

  const cardTitle = screen.getByText("Happy Gilmore");
  expect(cardTitle).toBeInTheDocument();

  const cardTableHead = screen.getByText("Average");
  expect(cardTableHead).toBeInTheDocument();

  const strokesAvg = screen.getByText("77");
  expect(strokesAvg).toBeInTheDocument();

  const puttsAvg = screen.getByText("22");
  expect(puttsAvg).toBeInTheDocument();

  const greeniesAvg = screen.getByText("1.11");
  expect(greeniesAvg).toBeInTheDocument();
});
