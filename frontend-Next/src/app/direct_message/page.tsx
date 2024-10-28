"use client"

import axios from 'axios';

import { useEffect, useState } from "react";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

import NavigationBar from "@/components/navigation/navigationbar";


import { useRouter } from "next/navigation";

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

interface User {
  userid: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface Message {
  primaryKey: number;
  senderID: number;
  receiverID: number;
  content: string;
}

export default function Home() {

  const router = useRouter();

    const [friends, setFriends] = useState<User[]>([]);
    const [error, setError] = useState("");

    const [textingUserID, setTextingUserID] = useState<User | null>(null);

    const loggedInUserID = localStorage.getItem("userid");

    const [message, setMessage] = useState<string>("");
    const [userId, setUserId] = useState<string>(`${loggedInUserID}`);
    const [messages, setMessages] = useState<{ text: string; userId: string }[]>([]);//string linked to a string
    //const [messageList, setMessageList] = useState<Message[]>([
    //  { primaryKey: 1, senderID: 9, receiverID: 11, content: 'Hello!' },//TEST
    //{ primaryKey: 2, senderID: 9, receiverID: 11, content: 'How are you?' },
    //{ primaryKey: 3, senderID: 11, receiverID: 9, content: 'I am good' },
    //{ primaryKey: 4, senderID: 12, receiverID: 11, content: 'this is secret'}
    //]);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [myMessageList, setMyMessageList] = useState<Message[]>([]);//all the messages that belong to you
    const [myLoadedMessageList, setMyLoadedMessageList] = useState<Message[]>([]);//the list that is yours and with a specific user

    

    //const [messageData, setMessageData] = useState([]);//new messages

    //retrevign user data
    const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      bio: "",
    });
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false); // Add state to control alert visibility
    const [alertMessage, setAlertMessage] = useState(""); // State to hold alert message
    const [alertTitle, setAlertTitle] = useState(""); // State to hold alert message

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
          } finally {
            // Simulate a delay for loading
            setTimeout(() => {
              setLoading(false); 
            }, 1000);
          }
        };
    
        fetchUserData();//getting logged in user data
    }, [router, error]); // Include router as a dependency

    const fetchMessages = async () => {//retreving from db
      try {
        const response = await axios.get('http://localhost:8080/api/messages/all');
        setMessageList(response.data); // Update messageList with data from backend
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    const saveMessagesToBackend = async (messageList: Message[]) => {//send a list to the database
      try {
        const response = await axios.post('http://localhost:8080/api/messages/saveAll', messageList);
        console.log(response.data); // Optionally log the response
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    };

  const handleSendMessage = async () => {
    if (message.trim() && textingUserID != null) {
      
      const newMessage : Message = {
        primaryKey: messageList.length + 1,
        senderID: Number(loggedInUserID),
        receiverID: textingUserID?.userid ?? 0,
        content: message.trim(),
      };

      setMessageList([...messageList, newMessage]);//all messages
      setMyMessageList(sortMessages(Number(loggedInUserID)));
      setMyLoadedMessageList(sortSpecificMessages(textingUserID?.userid ?? 0));
      setMessage("");

      //going to save this to the backend then
      //saveMessagesToBackend(messageList);
    }
  };

  const sortMessages = (id : number): Message[] => {//find myMessages
    return messageList.filter(
      (message) => message.senderID === id || message.receiverID === id
    );
  };

  const sortSpecificMessages = (id : number): Message[] => {
    return myMessageList.filter(
      (message) => message.senderID == id || message.receiverID == id
    );
  }; //find messages with a certain user


  const switchTextingUser = async (user: User) => {
    //saveMessagesToBackend(messageList);
    //fetchMessages();

    setTextingUserID(user);
    setMyMessageList(sortMessages(Number(loggedInUserID)));
    setMyLoadedMessageList(sortSpecificMessages(textingUserID?.userid ?? 0));
    return;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <NavigationBar />


      <main className="pt-20 px-40">
                <Card>
                  <CardHeader>
                    <CardTitle>Friends List</CardTitle>
                  </CardHeader>

                  

                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>id</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {friends.map((friend, index) => {
                          console.log("Rendering friend ID:", friend.userid);
                          return (
                            <TableRow key={index}>
                              <TableCell>
                              <Button onClick={() => switchTextingUser(friend)}>
                                {friend.username}
                                </Button>
                                
                                </TableCell>
                                <TableCell>
                                  {friend.userid}
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

    <div >  {/* start of the MESSAGING INTERFACE */}
      
      <p>Username : {userData.username} ID : {loggedInUserID}</p>
      <Button onClick={() => saveMessagesToBackend(myMessageList)}>Save</Button>
      <Button onClick={() => fetchMessages()}>Load</Button>
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <h2 className="text-xl font-bold">Messaging: {textingUserID?.username}</h2>
        </CardHeader>

          <div className="space-y-4">
            {/* Messages */}
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {messageList.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet</p>
              ) : (
                myLoadedMessageList.map((msg) => (
                  <div
                    key={msg.primaryKey}
                    className="p-2 rounded-md bg-blue-100 mb-2"
                  >
                    Sent By:{msg.receiverID} | " {msg.content} "
                  </div>
                ))
              )}
            </div>

            {/* USER_ID Input + Message Input + Send Button     PK:{msg.primaryKey} | S:{msg.senderID} | R:{msg.receiverID} | " {msg.content} " */}
            <div className="space-y-2">


              {/* Message Input */}
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full"
              />

              {/* Send Button */}
              <Button onClick={handleSendMessage} className="bg-blue-500 text-white w-full">
                Send
              </Button>
            </div>
          </div>

      </Card>
    </div>


    

    </div>//end parent element

    

    
  );
}
