import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";
import RoundForm from "./RoundForm";

const usernamesArr = ["happy-gilmore", "shooter-mcgavin", "tiger-woods"];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <RoundForm usernames={usernamesArr} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <RoundForm usernames={usernamesArr} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <RoundForm usernames={usernamesArr} />
      </UserProvider>
    </MemoryRouter>
  );

  const playerInput = screen.getByLabelText("Player");
  expect(playerInput).toBeInTheDocument();

  //only one button in the component
  const submitBtn = screen.getByRole("button");
  expect(submitBtn).toBeInTheDocument();
});
