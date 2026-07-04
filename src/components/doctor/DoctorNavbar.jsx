import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import Container from "../common/Container";
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
import { LogOut, LayoutDashboard } from "lucide-react";

const DoctorNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Logo />

          <div className="hidden lg:flex gap-8 font-medium text-muted-foreground">
            <Link to="/doctor/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/doctor/appointments" className="hover:text-primary transition-colors">Appointments</Link>
            <Link to="/doctor/availability" className="hover:text-primary transition-colors">Availability</Link>
            <Link to="/doctor/earnings" className="hover:text-primary transition-colors">Earnings</Link>
            <Link to="/doctor/analytics" className="hover:text-primary transition-colors">Analytics</Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "Dr"}`} alt={user?.name || "Doctor"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "D"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. {user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || user?.mobile}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/doctor/dashboard" className="cursor-pointer flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default DoctorNavbar;
