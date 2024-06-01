import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";
import Header from ".";
import Theme from "../../enums/Theme";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header theme={Theme.Light} toggleTheme={() => {}} />
      </QueryClientProvider>
    </BrowserRouter>,
  );
});
