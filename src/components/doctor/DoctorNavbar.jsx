import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import Container from "../common/Container";
import Button from "../common/Button";

const DoctorNavbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-white border-b shadow-sm z-50">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Logo />

          <div className="flex gap-8 font-medium">
            <Link to="/doctor/dashboard">Dashboard</Link>

            <Link to="/doctor/appointments">Appointments</Link>

            <Link to="/doctor/availability">Availability</Link>

            <Link to="/doctor/earnings">Earnings</Link>

            <Link to="/doctor/analytics">Analytics</Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-blue-700">👨‍⚕️ {user?.name}</span>

            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default DoctorNavbar;
