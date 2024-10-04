"use client";

import React, { useEffect, useState } from "react";
import StoryCard from "./story-card";
import PostCard from "./post-card";
import NavigationBar from "@/components/navigation/navigationbar";
import "./NewsFeed.css";

interface Story {
  id: string;
  user: {
    profilePictureUrl: string;
    username: string;
  };
  date: string;
  content: string;
  hasImage: boolean;
  imageUrl?: string; // Optional property
}

function NewsFeed() {
  // const [storyIds, setStoryIds] = useState([]);
  const [storyIds, setStoryIds] = useState<Story[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/story/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch story IDs");
        }
      })
      .then((data) => setStoryIds(data))
      .catch((error) => console.error("Error fetching story IDs:", error));
  }, []);

  return (
    <div className={"news-feed"}>
      <NavigationBar />

      <PostCard />
      {storyIds.length > 0 ? (
        storyIds.map((story, index) => (
          <StoryCard key={story.id || index} story={story} /> // Use a unique identifier, fallback to index
        ))
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}

export default NewsFeed;
