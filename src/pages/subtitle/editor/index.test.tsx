import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";
import Editor from ".";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Editor />
      </QueryClientProvider>
    </BrowserRouter>,
  );
});
