import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GreenieCard from "./GreenieCard";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <GreenieCard
        id="1"
        holeNumber="1"
        feet="11"
        inches="11"
        owner="Happy Gilmore"
        courseName="Pebble Beach Golf Course"
        courseImg="/course-photos/pebble-beach.jpg"
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <GreenieCard
        id="1"
        holeNumber="1"
        feet="11"
        inches="11"
        owner="Happy Gilmore"
        courseName="Pebble Beach Golf Course"
        courseImg="/course-photos/pebble-beach.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays greenie card", function () {
  render(
    <MemoryRouter>
      <GreenieCard
        id="1"
        holeNumber="1"
        feet="11"
        inches="11"
        owner="Happy Gilmore"
        courseName="Pebble Beach Golf Course"
        courseImg="/course-photos/pebble-beach.jpg"
      />
    </MemoryRouter>
  );

  const cardTitle = screen.getByText("Pebble Beach");
  expect(cardTitle).toBeInTheDocument();

  const cardImg = screen.getByAltText("Pebble Beach Golf Course");
  expect(cardImg).toBeInTheDocument();

  const cardLink = screen.getByRole("link");
  expect(cardLink).toBeInTheDocument();

  const cardOwner = screen.getByText("Happy Gilmore");
  expect(cardOwner).toBeInTheDocument();

  const cardHoleNumber = screen.getByText("#1");
  expect(cardHoleNumber).toBeInTheDocument();

  const cardDistance = screen.getByText(`11' 11"`);
  expect(cardDistance).toBeInTheDocument();
});
