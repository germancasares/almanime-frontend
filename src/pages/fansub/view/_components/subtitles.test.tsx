import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { test } from "vitest";
import Subtitles from "./subtitles";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Subtitles acronym="" />
    </QueryClientProvider>,
  );
});
