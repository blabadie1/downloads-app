import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import App from "./App";

test("renders table", () => {
  render(<App />);
  const linkElement = screen.getByText(/Name/i);
  expect(linkElement).toBeInTheDocument();
});

test("select all - none selected", () => {
  render(<App />);
  const selectAll = document.getElementById("all-selected-checkbox");
  expect(selectAll).toHaveProperty("checked", false);
  fireEvent(selectAll, new MouseEvent("click"));
  expect(selectAll).toHaveProperty("checked", true);
});

test("select all - some selected", () => {
  render(<App />);
  const firstRow = document.getElementsByClassName("row-checkbox")[0];
  fireEvent(firstRow, new MouseEvent("click"));
  expect(firstRow).toHaveProperty("checked", true);

  const selectAll = document.getElementById("all-selected-checkbox");
  // Indeterminate state is considered unchecked
  expect(selectAll).toHaveProperty("checked", false);
  fireEvent(selectAll, new MouseEvent("click"));
  expect(selectAll).toHaveProperty("checked", true);
});

test("download button - no valid selections", () => {
  render(<App />);
  expect(screen.queryByText("Download Selected")).toBeNull();
});
