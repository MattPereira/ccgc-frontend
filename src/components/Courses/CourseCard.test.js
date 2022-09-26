import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CourseCard from "./CourseCard";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <CourseCard
        handle="pebble-beach"
        name="Pebble Beach Golf Course"
        imgUrl="pebble.com/beach.jpg"
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CourseCard
        handle="pebble-beach"
        name="Pebble Beach Golf Course"
        imgUrl="pebble.com/beach.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter>
      <CourseCard
        handle="pebble-beach"
        name="Pebble Beach Golf Course"
        imgUrl="pebble.com/beach.jpg"
      />
    </MemoryRouter>
  );

  const cardTitle = screen.getByText("Pebble Beach Golf Course");
  expect(cardTitle).toBeInTheDocument();

  const cardImg = screen.getByAltText("Pebble Beach Golf Course");
  expect(cardImg).toBeInTheDocument();

  const cardLink = screen.getByRole("link");
  expect(cardLink).toBeInTheDocument();
});
