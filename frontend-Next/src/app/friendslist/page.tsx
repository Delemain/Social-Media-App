"use client";

import { useEffect, useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import Navigationbar from "@/components/navigation/navigationbar";

interface User {
    userid: number;
    firstName: string;
    lastName: string;
    username: string;
  }

export default function Friendslist() {

    const router = useRouter();

    const [friends, setFriends] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFriends = async () => {
            try {
              const userId = localStorage.getItem("userid"); // Get the logged-in user's ID
              if (!userId) {
                router.push("/"); // Redirect to login if no user is logged in
                return;
              }
      
              const res = await fetch(`http://localhost:8080/api/friendslist/${userId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
      
              if (!res.ok) {
                throw new Error("Failed to fetch friend list");
              }
              const data = await res.json();

              console.log("Fetched friends:", data);

              setFriends(data);
            } catch (err) {
              if (err instanceof Error) {
                setError(err.message || "Failed to load friend list");
              } else {
                setError("An unknown error occurred");
              }
            }
          };
        fetchFriends(); // Call the function here
    }, [router]); // Include router as a dependency

    const handleDeleteFriend = async (friendID : number) => {

      if (typeof friendID !== 'number' || isNaN(friendID)) {
        console.error("Invalid friendID:", friendID); // Log if friendID is invalid
        return;
    }


      const userId = localStorage.getItem("userid"); // Get the logged-in user's ID
        if (!userId) {
          router.push("/"); // Redirect to login if no user is logged in
          return;
        }

        try {
          const res = await fetch(`http://localhost:8080/api/friendslist/delete/${userId}/${friendID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to delete friend");
          }

          setFriends(prevFriends => prevFriends.filter(friend => friend.userid !== friendID));
        }
        catch (err) {
          if (err instanceof Error) {
            setError(err.message || "Failed to delete friend");
          } else {
            setError("An unknown error occurred");
          }
        }
      }

    return(
        <>
            <Navigationbar />
            <main className="pt-20 px-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Friends List</CardTitle>
                  </CardHeader>

                  {error && <div className="text-red-500">{error}</div>}

                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>First Name</TableHead>
                          <TableHead>Last Name</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Options</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {friends.map((friend, index) => {
                          console.log("Rendering friend ID:", friend.userid);
                          return (
                            <TableRow key={index}>
                              <TableCell>{friend.firstName}</TableCell>
                              <TableCell>{friend.lastName}</TableCell>
                              <TableCell>{friend.username}</TableCell>
                              <TableCell>
                                <Button onClick={() => handleDeleteFriend(friend.userid)}>
                                  Delete Friend
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })

                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
            </main>
        </>
    );
}
