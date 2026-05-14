import { Navigate } from "react-router-dom";
import { getUserDetails } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  const user = getUserDetails();
  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return children;
}
