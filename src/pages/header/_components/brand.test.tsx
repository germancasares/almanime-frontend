import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";
import Theme from "../../../enums/Theme";
import Brand from "./brand";

test("renders without crashing", () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Brand
          isOpen={false}
          onClick={() => {}}
          theme={Theme.Light}
          toggleTheme={() => {}}
        />
      </QueryClientProvider>
    </BrowserRouter>,
  );
});
