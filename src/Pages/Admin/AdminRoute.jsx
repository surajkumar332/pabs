import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return <Navigate to="/login" />;
  }

  if (decoded.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;