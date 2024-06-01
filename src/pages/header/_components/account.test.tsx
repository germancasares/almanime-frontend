import { render } from "@testing-library/react";
import { test } from "vitest";
import Account from "./account";

test("renders without crashing", () => {
  render(<Account toggleBurger={() => {}} />);
});
