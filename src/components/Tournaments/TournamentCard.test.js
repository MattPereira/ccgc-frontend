import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TournamentCard from "./TournamentCard";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <TournamentCard
        date="2022-02-02"
        courseName="Pebble Beach Golf Course"
        imgUrl="/course-photos/pebble-beach"
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <TournamentCard
        date="2022-02-02"
        courseName="Pebble Beach Golf Course"
        imgUrl="/course-photos/pebble-beach"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays tournament card", function () {
  render(
    <MemoryRouter>
      <TournamentCard
        date="2022-02-02"
        courseName="Pebble Beach Golf Course"
        imgUrl="/course-photos/pebble-beach"
      />
    </MemoryRouter>
  );

  const cardTitle = screen.getByText("Pebble Beach Golf Course");
  expect(cardTitle).toBeInTheDocument();

  const cardDate = screen.getByText("February 2, 2022");
  expect(cardDate).toBeInTheDocument();

  const cardImage = screen.getByAltText("Pebble Beach Golf Course");
  expect(cardImage).toBeInTheDocument();
});
