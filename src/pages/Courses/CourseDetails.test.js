import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../testUtils";
import CourseDetails from "./CourseDetails";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <CourseDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CourseDetails />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("initially displays loading spinner", async function () {
  render(
    <MemoryRouter initialEntries={["/courses/yocha-dehe"]}>
      <UserProvider>
        <Routes>
          <Route path="/courses/:handle" element={<CourseDetails />} />
        </Routes>
      </UserProvider>
    </MemoryRouter>
  );

  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
