import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import "./NewsFeed.css";
function StoryCard({ story }) {
    if (!story) {
        return <div>No story available</div>;
    }

    return (
        <div className="story-panel">
            <Card
                style={{
                    width: '500px', // Set a fixed width (adjust as needed)
                    margin: '0 auto', // Optional: Center the card horizontally
                }}
            >
                <CardTitle
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', // Vertically align in the center (optional)
                        fontSize: '14px', // Make the text smaller
                    }}
                >
                    <img
                        className="profile-pic-story"
                        src={story.profile_picture_url}
                        alt={"image no load"}
                    />
                    <CardContent style={{ justifyContent: 'flex-start' }}>
                        {story.username}
                        <br />
                        <span style={{ color: "#a9a9a9" }}>{new Date(story.date).toLocaleString()}</span>
                    </CardContent>
                </CardTitle>
                <CardContent>
                    {story.content}
                    <br />
                    {story.hasimage && story.image_url && (
                        <img className="story-image" src={story.image_url} alt="Story" width={200} height={200} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default StoryCard;