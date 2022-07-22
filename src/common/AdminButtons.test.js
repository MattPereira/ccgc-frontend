import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminButtons from "./AdminButtons";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <AdminButtons updatePath="/courses/pebble-beach/edit" />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <AdminButtons updatePath="/courses/pebble-beach/edit" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays", function () {
  render(
    <MemoryRouter>
      <AdminButtons updatePath="/courses/pebble-beach/edit" />
    </MemoryRouter>
  );

  const editBtn = screen.getByText("Edit");
  expect(editBtn).toBeInTheDocument();

  const deleteBtn = screen.getByText("Delete");
  expect(deleteBtn).toBeInTheDocument();
});
