import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card";
import { Loader2 } from "lucide-react";
import Logo from "../../components/common/Logo";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background/50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg shadow-2xl border-border/50">
        <CardHeader className="space-y-4 flex flex-col items-center">
          <Logo />
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-primary">Create Account</CardTitle>
            <CardDescription>Join SehatRaj and manage your health</CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
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
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
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
            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button variant="link" type="button" className="p-0 h-auto font-semibold" onClick={() => navigate("/login")}>
                Log in
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
