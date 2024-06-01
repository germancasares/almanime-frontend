import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { test } from "vitest";
import List from ".";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <List />
    </QueryClientProvider>,
  );
});
