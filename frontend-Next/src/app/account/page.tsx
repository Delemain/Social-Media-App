"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
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
// import { Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import NavigationBar from "@/components/navigation/navigationbar";

export default function Account() {
  const router = useRouter(); // Initialise the router

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Add state to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert message
  const [alertTitle, setAlertTitle] = useState(""); // State to hold alert message

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userid"); // Retrieve userid from localStorage
      if (!userId) {
        console.error("User is not logged in");
        setError("User is not logged in");
        setAlertMessage(error);
        setAlertTitle("Something went wrong!")
        setShowAlert(true);
        
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if the response is JSON or plain text
        // const contentType = res.headers.get("Content-Type");
        // let responseData;

        // if (contentType && contentType.includes("application/json")) {
        //   const data = await res.json();
        //   responseData = data;
        // } else {
        //   responseData = await res.text();
        //   setError(responseData); // Handle plain text error message
        // }

        const data = await res.json();

        if (res.ok) {
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            username: data.username || "",
            password: data.password || "",
            email: data.email || "",
            bio: data.bio || "",
          });
        } else {
          console.error("Failed to fetch user data");
          setError(data);
          setAlertMessage("Failed to fetch user data");
          setAlertTitle("Something went wrong!")
          setShowAlert(true);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("An error occurred while fetching user data");
        setAlertMessage(error);
        setAlertTitle("Something went wrong!")
        setShowAlert(true);
      } finally {
        // Simulate a delay for loading
        setTimeout(() => {
          setLoading(false); 
        }, 1000);
      }
    };

    fetchUserData();
  }, [error]);

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      router.push("/");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Clear localStorage and redirect to home or login page
        localStorage.removeItem("userid");
        setUserData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          email: "",
          bio: "",
        }); // Clear user data
        router.push("/");
      } else {
        const errorText = await res.text();
        setError(errorText || "Failed to delete account.");
        setAlertMessage(errorText);
        setAlertTitle("Delete Account Failed")
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error deleting account", err);
      setError("An error occurred while deleting the account.");
      setAlertMessage("Failed to delete account.");
      setAlertTitle("Delete Account Failed")
      setShowAlert(true);
    }
  };

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setLoading(true);

    const userId = localStorage.getItem("userid");
    if (!userId) {
      setError("User is not logged in");
      setAlertMessage(error);
      setAlertTitle("Something went wrong!")
      setShowAlert(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send the updated user data to the backend
      });

      if (res.ok) {
        const responseText = await res.text();
        // alert(responseText); // Optionally show success message
        setAlertMessage(responseText); // Set success message
        setAlertTitle("Update Successful")
        setShowAlert(true);
      } else {
        const errorText = await res.text();
        if(errorText === "First name cannot be empty" || errorText === "First name cannot be empty" || errorText === "Last name cannot be empty" || errorText === "Username cannot be empty" || errorText === "Email cannot be empty" || errorText === "Password cannot be empty"){
          setError(errorText);
          setAlertMessage(errorText);
          setAlertTitle("Update Unsuccessful!")
          setShowAlert(true);
        } else{
          setError("Email or Username already in use.");
          setAlertMessage("Email or Username already in use. Please try again!");
          setAlertTitle("Update Unsuccessful!")
          setShowAlert(true);
        }
      }
    } catch (err) {
      console.error("Error updating user details", err);
      setError("An error occurred while updating user details.");
      setAlertMessage(error);
      setAlertTitle("Something went wrong!")
      setShowAlert(true);
    } finally {
      // Simulate a delay for loading
        setLoading(false); 
    }
  };

  const handleViewLogs = () => {
    router.push("/logs"); // Redirect to /logs
  };

  const handleCancel = () => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userid"); // Retrieve userid from localStorage
      if (!userId) {
        console.error("User is not logged in");
        setError("User is not logged in");
        setAlertMessage(error);
        setAlertTitle("Something went wrong!")
        setShowAlert(true);
        
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            username: data.username || "",
            password: data.password || "",
            email: data.email || "",
            bio: data.bio || "",
          });
        } else {
          console.error("Failed to fetch user data");
          setError(data);
          setAlertMessage("Failed to fetch user data");
          setAlertTitle("Something went wrong!")
          setShowAlert(true);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("An error occurred while fetching user data");
        setAlertMessage(error);
        setAlertTitle("Something went wrong!")
        setShowAlert(true);
      }
    };

    fetchUserData();
  };

  const handleLogout = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userid");
  
    if (!userId) {
      router.push("/"); // Redirect to home if no user is logged in
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8080/api/logout/${userId}`, {
        method: "POST", // Assuming POST for logging out
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        // Remove userId from localStorage and redirect to login page
        localStorage.removeItem("userid");
        router.push("/");
      } else {
        const errorText = await res.text();
        setError(errorText || "Failed to log out.");
        setAlertMessage(errorText);
        setAlertTitle("Logout Failed");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error logging out", err);
      setError("An error occurred while logging out.");
      setAlertMessage("An error occurred while logging out.");
      setAlertTitle("Logout Failed");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <NavigationBar/>
      <div className="absolute top-4 right-4">
        <Button className="mr-5" onClick={handleLogout}>Logout</Button>
        <ModeToggle />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Card className="mx-auto max-w-md">
          <CardHeader className="mb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">My account</CardTitle>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            {/* {error && <p className="text-red-500">{error}</p>} */}
            <form className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid-gap-2">
                  <Label>First name</Label>
                  <Input
                    id="first-name"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid-gap-2">
                  <Label>Last name</Label>
                  <Input
                    id="last-name"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid-gap-2">
                <Label>Username</Label>
                <Input
                  id="username"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid-gap-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid-gap-2">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid-gap-2">
                <Label>My Bio</Label>
                <Textarea
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" onClick={handleUpdateDetails}>
                {" "}
                Update details
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  {" "}
                  Cancel{" "}
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  className="flex-1"
                  onClick={handleViewLogs}
                >
                  View logs
                </Button>
              </div>
              <Button
                type="submit"
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete account
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

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
  );
}
