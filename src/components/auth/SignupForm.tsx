import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { signUp } from "../../lib/auth";

const SignupForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      await signUp({
        email,
        password,
        full_name: fullName,
      });

      // Navigate to login page with success message
      navigate("/login", {
        state: {
          message:
            "Registration successful! Please check your email to confirm your account.",
        },
      });
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  terms and conditions
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
