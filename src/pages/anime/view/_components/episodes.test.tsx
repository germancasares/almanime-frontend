import { render } from "@testing-library/react";
import { test } from "vitest";
import Episodes from "./episodes";

test("renders without crashing", () => {
  render(<Episodes episodes={[]} animeSubtitles={{}} />);
});
