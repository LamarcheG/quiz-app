import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { UserProvider } from "./Stores/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./Pages/ErrorPage";
import { Root } from "./Pages/Root";
import { Stack } from "./Pages/Quiz/Stack";
import { Index } from "./Pages/Index";
import { MyStacks } from "./Pages/MyStacks";
import { Stats } from "./Pages/Quiz/Stats";
import { EditStack } from "./Pages/Quiz/EditStack";
import { StackIndex } from "./Pages/Quiz/StackIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/stacks/:stackId",
        element: <StackIndex />,
        children: [
          {
            path: "/stacks/:stackId/quiz",
            element: <Stack />,
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
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
