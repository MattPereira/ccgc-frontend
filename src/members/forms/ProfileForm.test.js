import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";

import ProfileForm from "./ProfileForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <ProfileForm />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ProfileForm />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and submit button", function () {
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <UserProvider>
        <ProfileForm />
      </UserProvider>
    </MemoryRouter>
  );

  const firstNameInput = screen.getByLabelText("First Name :");
  expect(firstNameInput).toBeInTheDocument();

  const lastNameInput = screen.getByLabelText("Last Name :");
  expect(lastNameInput).toBeInTheDocument();

  const emailInput = screen.getByLabelText("Email :");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText("Password :");
  expect(passwordInput).toBeInTheDocument();

  //only one button in the component
  const submitBtn = screen.getByRole("button");
  expect(submitBtn).toBeInTheDocument();
});
