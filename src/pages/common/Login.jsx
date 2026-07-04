import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card";
import { Loader2 } from "lucide-react";
import Logo from "../../components/common/Logo";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await loginUser(formData);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      toast.success("Login Successful");

      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (result.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background/50 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="space-y-4 flex flex-col items-center">
          <Logo />
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <div className="text-right">
              <Button
                variant="link"
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="px-0 h-auto text-sm text-primary font-medium"
              >
                Forgot Password?
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Logging in..." : "Log In"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => navigate("/register")}>
                Register now
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
