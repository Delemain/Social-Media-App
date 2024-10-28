"use client"

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

interface GCMessage {//all gc messages that exist
  primaryKey: number;
  foreignKey: number;//toGroupChat
  senderID: number;
  content: string;
}

interface GroupChat {
  primaryKey: number;
  allUsers: number[];//all the IDs of the users that are in the chat
}

export default function Home() {

  const router = useRouter();

    const [friends, setFriends] = useState<User[]>([]);
    const [error, setError] = useState("");

    const [activeGroupChat, setActiveGroupChat] = useState<GroupChat | null>(null);

    const loggedInUserID = localStorage.getItem("userid");

    const [message, setMessage] = useState<string>("");
    const [userId, setUserId] = useState<string>(`${loggedInUserID}`);
    const [messages, setMessages] = useState<{ text: string; userId: string }[]>([]);//string linked to a string


    //GroupChatTable
    const [groupChatList, setGroupChatList] = useState<GroupChat[]>([
      {primaryKey: 1, allUsers: [9, 11, 12]},
      {primaryKey: 2, allUsers: [11, 12]},
      {primaryKey: 3, allUsers: [9, 12, 13]},
    ]);//all groupchats in existance
    const [loadedGCList, setLoadedGCList] = useState<GroupChat[]>([]);//all groupchats that you are in

    //GroupChatMessages
    const [groupChatMessages, setGroupChatMessages] = useState<GCMessage[]>([]);//all gc messages (this is what is gonna be loaded from DB)
    const [loadedGCMessages, setLoadedGCMessages] = useState<GCMessage[]>([]);//all gc messages that are in the current chat

    const [messageData, setMessageData] = useState([]);//new messages


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
    fetchFriends();

        const loadMessages = async () => {
          //const messagesData = await fetchMessages();
          //setMessageData(messagesData);//makes messageData into the messages loaded

          //setMyMessageList(sortMessages(Number(loggedInUserID)));
          //setMyLoadedMessageList(sortSpecificMessages(textingUserID?.userid ?? 0));
          setLoadedGCList(findMyGroupChats());
          setLoadedGCMessages(findGroupChatMessages());
        };
        loadMessages();

        

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




  const findMyGroupChats = (): GroupChat[] => {
    return groupChatList.filter((groupChat) => groupChat.allUsers.includes(Number(loggedInUserID)));
    //get the groupChatList and find all the ones with the logged in user
  };

  const getUsersInChat = (): string[] => {
    let usernames : string[] = [];

    //friends.filter((friend) => friend.userid)
    usernames = activeGroupChat?.allUsers.map(id => id.toString()) ?? [""];
    return usernames;
  };

  const handleSendMessage = async () => {
    //TODO
    if (message.trim() && activeGroupChat != null) {

      const newGCMessage : GCMessage = {
        primaryKey: groupChatMessages.length + 1,
        foreignKey: activeGroupChat.primaryKey,
        senderID: Number(loggedInUserID),
        content: message.trim(),
      };

      setGroupChatMessages([...groupChatMessages, newGCMessage]);

      setLoadedGCMessages(findGroupChatMessages());

      setMessage("");

    }
  };

  const isUserInChat = (ID : number): boolean => {
    return false;
  };

  const findGroupChatMessages = (): GCMessage[] => {
    //return groupChatMessages;//get all messages, find all that are in a certain chat
    return groupChatMessages.filter((gcmessages) => gcmessages.foreignKey === activeGroupChat?.primaryKey);
    //get activeGroupChat which is a single GroupChat. Then do activeGroupChat.primaryKey, and then filter through groupChatMessages and see the ones that pertain to that number you got
  }

  const switchActiveChat = async (chat : GroupChat) => {//TODO
    setActiveGroupChat(chat);

    setLoadedGCMessages(findGroupChatMessages());
    
    return;
  };

  const addRemoveUser = async (friend : User) => {
    if (activeGroupChat != null) {
    if (activeGroupChat.allUsers.includes(friend.userid)) {
      //remove
      //from groupChatList
      //from activeGroupChat
      //friend.userid;
      //const temp_array:  = activeGroupChat.allUsers.filter();
      let allUsersArray: number[] = activeGroupChat.allUsers; // list of all users currently
      const updatedUsersArray: number[] = allUsersArray.filter(item => item !== friend.userid); // get rid of the param user

      const newTempGC: GroupChat = {
          primaryKey: activeGroupChat.primaryKey,
          allUsers: updatedUsersArray,
      };

      setActiveGroupChat({ ...newTempGC});

      //edit the same shit, in the List

    }
    else {
      //add
      let allUsersArray: number[] = activeGroupChat.allUsers; // list of all users currently
      allUsersArray.push(friend.userid); // add user

      const newTempGC: GroupChat = {
          primaryKey: activeGroupChat.primaryKey,
          allUsers: allUsersArray,
      };

      setActiveGroupChat({ ...newTempGC});
    }
  }
  };

  /*
  const createNewChat = () => {
    let temp_list: GroupChat[] = {...groupChatList};

    const newGroupChat: GroupChat = {
      primaryKey: groupChatList.length + 1,
      allUsers: [Number(loggedInUserID)],
    };

    //[...messageList, newMessage]
    temp_list = [...groupChatList, newGroupChat];
    setGroupChatList({...temp_list});

    findMyGroupChats();
  };
  */

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <NavigationBar />


      <main className="pt-20 px-40">
                <Card>
                  <CardHeader>
                    <CardTitle>My Group Chats</CardTitle>
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
                        {loadedGCList.map((gc, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                              <Button onClick={() => switchActiveChat(gc)}>
                                {gc.primaryKey}
                                </Button>
                                
                                </TableCell>
                                <TableCell>
                                  gc_name
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
      { /*<Button onClick={() => createNewChat()}>Create New Chat</Button> */}
      <p>{activeGroupChat?.allUsers.join(', ')}</p>
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <h2 className="text-xl font-bold">Group ID: {activeGroupChat?.primaryKey}</h2>
        </CardHeader>

          <div className="space-y-4">
            {/* Messages */}
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {loadedGCMessages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet</p>
              ) : (
                loadedGCMessages.map((msg) => (
                  <div
                    key={msg.primaryKey}
                    className="p-2 rounded-md bg-blue-100 mb-2"
                  >
                    PK:{msg.primaryKey} | FK:{msg.foreignKey} | S:{msg.senderID} | " {msg.content} "
                  </div>
                ))
              )}
            </div>

            {/* USER_ID Input + Message Input + Send Button */}
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

    <div>
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
                          <TableHead>edit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {friends.map((friend, index) => {
                          console.log("Rendering friend ID:", friend.userid);
                          return (
                            <TableRow key={index}>
                              <TableCell>
                              
                                {friend.username}
                                
                                
                                </TableCell>
                                <TableCell>
                                  {friend.userid}
                                </TableCell>
                                <TableCell>
                                  <Button onClick={() => addRemoveUser(friend)}>
                                    Add/Del
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
    </div>


    

    </div>//end parent element

    

    
  );
}
