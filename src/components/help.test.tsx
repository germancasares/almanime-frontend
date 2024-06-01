import { render } from "@testing-library/react";
import { test } from "vitest";
import { Error, Success } from "./help";

test("renders without crashing", () => {
  render(<Error message="Test" />);
});

test("renders without crashing", () => {
  render(<Success message="Test" />);
});
