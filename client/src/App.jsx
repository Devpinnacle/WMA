import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Root from "./components/layouts/Root";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Land from "./components/layouts/Land";
import Cp2 from "./components/layouts/Cp2";
import Cp from "./components/layouts/Cp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "login",
          element: (
            <ProtectedRoute reverse>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: "",
          element: <Land />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Cp />
                </ProtectedRoute>
              ),
            },
            {
              path: "cp2",
              element: (
                <ProtectedRoute>
                  <Cp2 />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
