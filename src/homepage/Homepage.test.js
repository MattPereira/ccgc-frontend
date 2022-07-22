import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../testUtils";
import Homepage from "./Homepage";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("initially displays loading spinner", async function () {
  render(
    <MemoryRouter initialEntries={["/courses/yocha-dehe"]}>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );

  const ccgcLogo = screen.getByAltText("ccgc-logo");
  expect(ccgcLogo).toBeInTheDocument();
});
