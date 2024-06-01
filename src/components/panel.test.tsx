import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";
import Panel from "./panel";

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <Panel
        name="Test"
        to="/"
        star={{
          shouldShow: false,
          isSelected: false,
          onClick: () => {},
        }}
      />
    </BrowserRouter>,
  );
});
