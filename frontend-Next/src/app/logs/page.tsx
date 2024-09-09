// import Image from "next/image";
// import Link from "next/link"
import {
  File,
  ListFilter,
} from "lucide-react";

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

const logs = [
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
  {
    logId: "001",
    logStatus: "Login",
    date: "12/12/2024",
  },
];

export default function Logs() {
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">LogID</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.logId}>
                      <TableCell className="font-medium">
                        {log.logId}
                      </TableCell>
                      <TableCell><Badge className="bg-foreground">{log.logStatus}</Badge></TableCell>
                      <TableCell>{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>30</strong> logs
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
