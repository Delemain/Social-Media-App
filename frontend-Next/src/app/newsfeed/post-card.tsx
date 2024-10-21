"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./NewsFeed.css";

function PostCard() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userid") : null;
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handlePostStory = async () => {
        setError(null); // Clear any previous error

        const data = {
            userID: userId,  // Assuming the userID is hardcoded here, adjust as needed
            content,
            hasImage: false,
        };

        try {
            const response = await fetch("http://localhost:8080/api/story/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),  // Directly send the JSON data
            });

            if (!response.ok) {
                throw new Error("Failed to post story");
            }

            // Clear the content after successful post
            setContent("");
            setError("Story Posted");
            window.location.reload();

        } catch (err) {
            console.error("Error posting story:", err);
            setError("Error posting story");
        }
    };

    return (
        <Card
            style={{
                width: '500px', // Set a fixed width (adjust as needed)
                margin: '0 auto', // Center the card horizontally
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
            }}
        >
            <CardTitle className="text-2xl"
                       style={{
                           margin: '10px 0 0 0', // Correct margin format
                       }}>New story</CardTitle>
            <CardContent
                style={{
                    padding: '20px', // Padding for card content
                }}>
                <textarea style={{
                    width: '400px',
                    height: '200px',
                }}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your story..."
                />
                <br/><br/>
                <Button onClick={handlePostStory}>Post Story</Button>
                <p className="error">
                    {error}
                </p>
            </CardContent>
        </Card>
    );
}

export default PostCard;