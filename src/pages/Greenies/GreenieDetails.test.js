import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../testUtils";
import GreenieDetails from "./GreenieDetails";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <GreenieDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <GreenieDetails />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("initially displays the loading spinner", async function () {
  render(
    <MemoryRouter initialEntries={["/courses/yocha-dehe"]}>
      <UserProvider>
        <Routes>
          <Route path="/courses/:handle" element={<GreenieDetails />} />
        </Routes>
      </UserProvider>
    </MemoryRouter>
  );

  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
