"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react"

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Next.js router for navigation
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Add state to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert message
  const [alertTitle, setAlertTitle] = useState(""); // State to hold alert message

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });

    // const contentType = res.headers.get("Content-Type");
    // let responseText;

    // if (contentType && contentType.includes("application/json")) {
    //   const data = await res.json();
    //   responseText = data.message;
    // } else {
    //   responseText = await res.text();
    // }

    if (res.ok) {
      // Redirect to login or show success
      router.push("/");
    } else {
      const errorText = await res.text();
      console.error(errorText);

      if(errorText === "Email already in use"){
        setError(errorText || "Registration failed. Please try again.");
        setAlertMessage(errorText);
        setAlertTitle("Registration Unsuccessful!")
      } else{
        setError("Username already in use");
        setAlertMessage(error);
        setAlertTitle("Registration Unsuccessful!")
      }
      setShowAlert(true);
    }
    setLoading(false);
};

  return (
    loading ? (
      <div className="flex justify-center items-center h-screen">
      <div><Loading /></div>
    </div>
    ) : (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid-gap-2">
                <Label>First name</Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid-gap-2">
                <Label>Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid-gap-2">
              <Label>Username</Label>
              <Input
                id="username"
                placeholder="bladerunner-01"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid-gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid-gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create an account</Button>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-5 flex-shrink text-sm text-gray-500">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
          </form>
          <div className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
            {/* Alert Dialog */}
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertCircle className="h-6 w-6" />
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
    )
  );
}
