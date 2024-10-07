"use client";

import React, { useEffect, useState } from "react";
import StoryCard from "./story-card";
import PostCard from "./post-card";
import NavigationBar from "@/components/navigation/navigationbar";
import "./NewsFeed.css";
function NewsFeed() {
    const [storyIds, setStoryIds] = useState([]);

    const fetchStories = () => {
        fetch("http://localhost:8080/api/story/all")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch story IDs");
                }
            })
            .then(data => setStoryIds(data))
            .catch(error => console.error("Error fetching story IDs:", error));
    };

    // useEffect to fetch stories when the component is mounted
    useEffect(() => {fetchStories();}, []);
    return (
        <div className={"news-feed"}>

                <NavigationBar/>

            <div style = {{
                display: 'flex',
                padding: '100px',
                flexDirection: 'column',
                alignItems: 'start',
            }}>
                <PostCard fetchStories={fetchStories}/>
                {storyIds.length > 0 ? (
                    storyIds.map((story, index) => (
                        <StoryCard key={index} userID={story.user_id} storyID={story.story_id}/> // Use a unique identifier, fallback to index
                    ))
                ) : (
                    <p>No stories found.</p>
                )}
            </div>
        </div>
    );
}

export default NewsFeed;