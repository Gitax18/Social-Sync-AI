"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie"; // Import the cookies hook
import AuthApi from "@/api/auth-api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["auth_token"]); // Define cookie name to store the JWT

  // Check if already logged in
  useEffect(() => {
    if (cookies.auth_token) {
      router.push("/"); // Redirect if already logged in
    }
  }, [cookies.auth_token, router]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      // Call the login method from AuthApiService
      const response = await AuthApi.login({
        email,
        password,
      });

      // Store the JWT token in cookies
      setCookie("auth_token", response.jwtToken);

      // Redirect to the homepage
      router.push("/");
      toast.success("Login successful!");

    } catch (error) {
      console.error("Login error:", error);
      toast.error((error as any).message || "Login failed");
    }
  };

  return (
    <Card className="mx-auto max-w-sm md:w-xl">
      <ToastContainer />
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
             
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
