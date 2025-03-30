"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie"; // For managing cookies
import AuthApi from "@/api/auth-api";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // Modal visibility state
  const [error, setError] = useState(""); // Error state
  const [cookies, setCookie] = useCookies(["auth_token"]); // Cookie for JWT token

  const router = useRouter();

  // Handle the form submission for registration
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Call register method from AuthApi
      const response = await AuthApi.register({
        username,
        email,
        password,
      });

      // Show OTP modal after successful registration
      setIsOtpModalOpen(true);
      toast.success("OTP has been sent to your email.");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong, please try again.");
      toast.error("Registration failed.");
    }
  };

  // Handle OTP submission for verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Verify OTP using AuthApi
      const response = await AuthApi.verifyOtp({
        email,
        otp,
      });

      // On successful OTP verification, store the JWT token in cookies
      if (response.jwtToken) {
        setCookie("auth_token", response.jwtToken);

        // Redirect the user to the home page after successful login
        router.push("/");
        toast.success("OTP verified and login successful.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("Invalid OTP or OTP expired.");
      toast.error("OTP verification failed.");
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
            <form onSubmit={handleOtpSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Button type="submit" className="w-full mt-4">
                Verify OTP
              </Button>
            </form>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => setIsOtpModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
