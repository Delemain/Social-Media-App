// import Image from "next/image";
// import Link from "next/link"
"use client";

import { useEffect, useState } from "react";

import { File, ListFilter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";

interface Log {
  logid: string;
  logType: string;
  logTime: string;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]); // Logs will be an array of Log objects
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch the logs for the logged-in user
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const userId = localStorage.getItem("userid"); // Get the logged-in user's ID
        if (!userId) {
          router.push("/"); // Redirect to login if no user is logged in
          return;
        }

        const res = await fetch(`http://localhost:8080/api/logs/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load logs");
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchLogs();
  }, [router]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Login</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Logout</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Update</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <ModeToggle />
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0" className="w-[1000px]">
            <CardHeader>
              <CardTitle>Account logs</CardTitle>
              <CardDescription>
                View your account logs by Login, Logout and Update.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">LogID</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const parsedDate = new Date(
                      log.logTime
                    ).toLocaleDateString();

                    return (
                      <TableRow key={log.logid}>
                        <TableCell className="font-medium">
                          {log.logid}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-foreground">{log.logType}</Badge>
                        </TableCell>
                        <TableCell>{parsedDate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>30</strong> logs
              </div>
            </CardFooter>
          </Card>
          <Button
                  variant="secondary"
                  type="button"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back to Account
                </Button>
        </main>
      </div>
    </div>
  );
}
