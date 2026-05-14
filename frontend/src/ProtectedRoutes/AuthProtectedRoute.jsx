import { Navigate } from "react-router-dom";
import { getUserDetails } from "../utils/storage";

export default function AuthProtectedRoute({ children }) {
  const user = getUserDetails();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
