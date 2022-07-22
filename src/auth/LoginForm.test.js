import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <LoginForm />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("Email");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();

  //only one button in the component
  const loginBtn = screen.getByRole("button");
  expect(loginBtn).toBeInTheDocument();
});
