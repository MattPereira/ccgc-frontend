import React from "react";
import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoadingSpinner />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(<LoadingSpinner />);
  expect(asFragment()).toMatchSnapshot();
});
