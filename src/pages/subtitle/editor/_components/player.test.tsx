import { render } from "@testing-library/react";
import { RefObject } from "react";
import { test } from "vitest";
import Player from "./player";

test("renders without crashing", () => {
  render(
    <Player
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
      subtitle={undefined}
      playerOptions={{}}
      onReady={() => {}}
    />,
  );
});
