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


export default function SearchUser() {

    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [searchName, setSearchName] = useState("");

    const fetchUsers = async (name: string) => {
        try {
          const userId = localStorage.getItem("userid"); // Get the logged-in user's ID
          if (!userId) {
            router.push("/"); // Redirect to login if no user is logged in
            return;
          }
  
          const res = await fetch(`http://localhost:8080/api/user-search/${name}/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

  
          if (!res.ok) {
            throw new Error("Failed to fetch friend list");
          }
          const data = await res.json();
          setUsers(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message || "Failed to load user list");
          } else {
            setError("An unknown error occurred");
          }
        }
      };
    
    useEffect(() => {
        fetchUsers(""); // Call the function here
    }, [router]); // Include router as a dependency

    const handleSearch = () => {
        fetchUsers(searchName); // Call fetchUsers with the current search input
    };

    const handleAddFriend = async (userSelectID: number) => {
        const userId = localStorage.getItem("userid"); // Get the logged-in user's ID
        if (!userId) {
          router.push("/"); // Redirect to login if no user is logged in
          return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/user-search/add/${userId}/${userSelectID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            });
  
            if (!res.ok) {
              throw new Error("Failed to add friend");
            }
            fetchUsers(searchName);
          }
          catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Failed to add friend");
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
                    <CardTitle>Users List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <input
                        type="text"
                        placeholder="Search user with keyword"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)} 
                    />
                    <Button onClick={handleSearch}>
                        Search user
                    </Button>

                    {error && <div className="text-red-500">{error}</div>}

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
                        {users.map((user, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{user.firstName}</TableCell>
                              <TableCell>{user.lastName}</TableCell>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>
                                <Button onClick={() => handleAddFriend(user.userid)}>
                                  Add Friend
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