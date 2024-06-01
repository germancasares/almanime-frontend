import { render } from "@testing-library/react";
import { test } from "vitest";
import { TabName } from "../../../../enums/TabName";
import Tabs from "./tabs";

test("renders without crashing", () => {
  render(<Tabs activeTab={TabName.Newest} changeTab={() => {}} />);
});
