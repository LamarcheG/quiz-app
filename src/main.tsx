import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { UserProvider } from "./Stores/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./Pages/ErrorPage";
import { Root } from "./Pages/Root";
import { Stack } from "./Pages/Stack";
import { Index } from "./Pages/Index";
import { MyStacks } from "./Pages/MyStacks";

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
