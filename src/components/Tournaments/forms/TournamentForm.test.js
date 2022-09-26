import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";
import TournamentForm from "./TournamentForm";

const courseHandles = ["pebble-beach", "roddy-ranch", "rooster-run"];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <TournamentForm courseHandles={courseHandles} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <TournamentForm courseHandles={courseHandles} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <TournamentForm courseHandles={courseHandles} />
      </UserProvider>
    </MemoryRouter>
  );

  const dateInput = screen.getByLabelText("Date");
  expect(dateInput).toBeInTheDocument();

  const courseInput = screen.getByLabelText("Golf Course");
  expect(courseInput).toBeInTheDocument();

  const tourYearInput = screen.getByLabelText("Tour Year");
  expect(tourYearInput).toBeInTheDocument();

  //only one button in the component
  const submitBtn = screen.getByRole("button");
  expect(submitBtn).toBeInTheDocument();
});
