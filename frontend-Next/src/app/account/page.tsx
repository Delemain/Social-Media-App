"use client";

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

export default function Account() {
  const router = useRouter(); // Initialise the router

  const handleViewLogs = () => {
    router.push("/logs"); // Redirect to /logs
  };

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader className="mb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">My account</CardTitle>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid-gap-2">
                <Label>First name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="grid-gap-2">
                <Label>Last name</Label>
                <Input id="last-name" placeholder="Smith" required />
              </div>
            </div>
            <div className="grid-gap-2">
              <Label>Username</Label>
              <Input id="username" placeholder="bladerunner-01"  required />
            </div>
            <div className="grid-gap-2">
              <Label>Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid-gap-2">
              <Label>Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid-gap-2">
              <Label>My Bio</Label>
              <Textarea placeholder="Type your message here." required />
            </div>
            <Button type="submit">Update details</Button>
            <div className="flex gap-4">
              <Button variant="secondary" type="button" className="flex-1">
                Cancel
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
            <Button type="submit" variant="destructive">
              Delete account
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
