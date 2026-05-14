import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import PollingPage from "./pages/PollingPage.jsx";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import AuthProtectedRoute from "./protectedRoutes/AuthProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

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
