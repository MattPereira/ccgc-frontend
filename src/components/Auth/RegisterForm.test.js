import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and register button", function () {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("Email");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();

  const firstNameInput = screen.getByLabelText("First Name");
  expect(firstNameInput).toBeInTheDocument();

  const lastNameInput = screen.getByLabelText("Last Name");
  expect(lastNameInput).toBeInTheDocument();

  //only one button in the component
  const registerBtn = screen.getByRole("button");
  expect(registerBtn).toBeInTheDocument();
});
