import { Navigate } from "react-router-dom";

const ProtectedDoctorRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedDoctorRoute;
