import React, { useEffect, useState } from "react";
import "./NewsFeed.css";
import StoryCard from "./story-card";
import PostCard from "./post-card";

function NewsFeed() {
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
        fetch("/api/stories/all")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch story IDs");
                }
            })
            .then(data => setStoryIds(data))
            .catch(error => console.error("Error fetching story IDs:", error));
    }, []);

    return (
        <div className={"news-feed"}>
            <PostCard/>
            {storyIds.length > 0 ? (
                storyIds.map(story => (
                    <StoryCard story={story}/>
                ))
            ) : (
                <p>No stories found.</p>
            )}
        </div>
    );
}

export default NewsFeed;