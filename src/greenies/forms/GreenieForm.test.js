import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GreenieForm from "./GreenieForm";

const holeNums = [3, 7, 12, 16];

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <GreenieForm par3HoleNums={holeNums} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <GreenieForm par3HoleNums={holeNums} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <GreenieForm par3HoleNums={holeNums} />
    </MemoryRouter>
  );

  const holeNumberInput = screen.getByLabelText("Hole #");
  expect(holeNumberInput).toBeInTheDocument();

  const feetInput = screen.getByLabelText("Feet");
  expect(feetInput).toBeInTheDocument();

  const inchesInput = screen.getByLabelText("Inches");
  expect(inchesInput).toBeInTheDocument();

  //only one button in the component
  const submitBtn = screen.getByRole("button");
  expect(submitBtn).toBeInTheDocument();
});
