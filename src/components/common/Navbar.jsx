import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");

    window.location.reload();
  };
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-gray-100 z-50">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Logo />

          <div className="hidden lg:flex gap-10 font-medium">
            <Link to="/">Home</Link>

            <Link to="/doctors">Doctors</Link>

            {user?.role === "patient" && (
              <Link to="/my-appointments">My Appointments</Link>
            )}

            {user?.role === "doctor" && (
              <Link to="/doctor/dashboard">Doctor Dashboard</Link>
            )}

            <Link to="/services">Services</Link>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>
          </div>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="font-semibold text-blue-700">
                  👤 {user.name}
                </span>

                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>

                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
