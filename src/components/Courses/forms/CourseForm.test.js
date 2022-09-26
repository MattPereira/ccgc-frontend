import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CourseForm from "./NewCourseForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <CourseForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CourseForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays form inputs and login button", function () {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <CourseForm />
    </MemoryRouter>
  );

  const nameInput = screen.getByLabelText("Course Name");
  expect(nameInput).toBeInTheDocument();

  const imgUrlInput = screen.getByLabelText("Image Url");
  expect(imgUrlInput).toBeInTheDocument();

  const ratingInput = screen.getByLabelText("Rating");
  expect(ratingInput).toBeInTheDocument();

  const slopeInput = screen.getByLabelText("Slope");
  expect(slopeInput).toBeInTheDocument();

  //only one button in the component
  const submitBtn = screen.getByRole("button");
  expect(submitBtn).toBeInTheDocument();
});
