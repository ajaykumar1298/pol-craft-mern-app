import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AuthProtectedRoute from "./ProtectedRoutes/AuthProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import PollingPage from "./pages/PollingPage";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route index element={<Home />}></Route>
      <Route
        path="/login"
        element={
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <AuthProtectedRoute>
            <Register />
          </AuthProtectedRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/poll/:id" element={<PollingPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}></RouterProvider>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#fff7ed",
          color: "#ea580c",
          border: "1px solid #fdba74",
        },
      }}
    />
  </>,
);
