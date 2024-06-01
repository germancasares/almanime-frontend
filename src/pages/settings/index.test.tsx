import { render } from "@testing-library/react";
import { test } from "vitest";
import Settings from ".";

test("renders without crashing", () => {
  render(<Settings />);
});
