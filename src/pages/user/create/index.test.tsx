import { act } from "@testing-library/react";
import { ComponentType, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { test, vi } from "vitest";
import Create from ".";
import UserApi from "../../../api/UserApi";

vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }: { children: ReactElement }) => children,
  withAuthenticationRequired: (component: ComponentType<object>) => component,
  useAuth0: () => ({
    isLoading: false,
    user: { sub: "foobar" },
    isAuthenticated: true,
    loginWithRedirect: vi.fn(),
    getIdTokenClaims: vi.fn().mockReturnValue({ nickname: "test" }),
  }),
}));

vi.mock("api/UserApi");

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  const queryClient = new QueryClient();
  const mockCreate = vi.fn().mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({ isNew: true }),
    isLoading: false,
  });

  UserApi.Create = mockCreate;

  act(() =>
    root.render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <Create accessToken="test" />
        </QueryClientProvider>
      </Router>,
    ),
  );
});
