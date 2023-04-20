import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { UserProvider } from "./Stores/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./Pages/ErrorPage";
import { Root } from "./Pages/Root";
import { Quiz } from "./Pages/StackPage/Quiz";
import { Index } from "./Pages/Index";
import { MyStacks } from "./Pages/MyStacks";
import { Stats } from "./Pages/StackPage/Stats";
import { EditStack } from "./Pages/StackPage/EditStack";
import { Stack } from "./Pages/Stack";
import { StacksProvider } from "./Stores/StacksContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/stacks/:stackId",
        element: <Stack />,
        children: [
          {
            path: "/stacks/:stackId/quiz",
            element: <Quiz />,
          },
          {
            path: "/stacks/:stackId/stats",
            element: <Stats />,
          },
          {
            path: "/stacks/:stackId/edit",
            element: <EditStack />,
          },
        ],
      },
      {
        path: "/stacks",
        element: <MyStacks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <StacksProvider>
        <RouterProvider router={router} />
      </StacksProvider>
    </UserProvider>
  </React.StrictMode>
);
