import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";
import Create from ".";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Create />
      </QueryClientProvider>
    </BrowserRouter>,
  );
});
