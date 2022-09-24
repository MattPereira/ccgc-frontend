import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MemberList from "./MemberList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <MemberList />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <MemberList />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("initially displays loading spinner", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <MemberList />
      </UserProvider>
    </MemoryRouter>
  );

  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
