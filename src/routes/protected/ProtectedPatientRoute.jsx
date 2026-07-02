import { Navigate } from "react-router-dom";

const ProtectedPatientRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "patient") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedPatientRoute;
