import { render } from "@testing-library/react";
import { test } from "vitest";
import Footer from ".";

test("renders without crashing", () => {
  render(<Footer />);
});
