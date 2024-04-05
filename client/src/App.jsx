import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Root from "./components/layouts/Root";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import MainLayout from "./components/layouts/sidebar/MainLayout";
import DashBoard from "./pages/DashBoard";
import Projects from "./pages/Projects";
import Section from "./pages/Section";
import Task from "./pages/Task";

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
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              ),
            },
            {
              path: "projects",
              element: (
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              ),
            },
            {
              path: "sections",
              element: (
                <ProtectedRoute>
                  <Section />
                </ProtectedRoute>
              ),
            },
            {
              path: "task",
              element: (
                <ProtectedRoute>
                  <Task />
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
