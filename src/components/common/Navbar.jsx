import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border z-50 transition-all duration-300">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Logo />

          <div className="hidden lg:flex gap-8 font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
            
            {user?.role === "patient" && (
              <Link to="/my-appointments" className="hover:text-primary transition-colors">My Appointments</Link>
            )}
            
            {user?.role === "doctor" && (
              <Link to="/doctor/dashboard" className="hover:text-primary transition-colors">Doctor Dashboard</Link>
            )}
            
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex gap-4 items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email || user.mobile}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={user.role === "doctor" ? "/doctor/dashboard" : "/my-appointments"} className="cursor-pointer flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full px-6 shadow-md hover:shadow-lg transition-shadow">Register</Button>
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
