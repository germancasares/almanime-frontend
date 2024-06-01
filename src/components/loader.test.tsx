import { render } from "@testing-library/react";
import { test } from "vitest";
import Loader from "./loader";

test("renders without crashing", () => {
  render(<Loader />);
});
