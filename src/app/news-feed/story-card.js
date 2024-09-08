import React from "react";
import "./NewsFeed.css";

function StoryCard({ story }) {
    if (!story) {
        return <div>No story available</div>;
    }

    return (
        <div className="story-panel">
            <div className="story-card">
                <div className="story-header">
                    <img
                        className="profile-pic-story"
                        src={story.profile_picture_url}
                        alt={"image no load"}
                    />
                    <div>
                        {story.username}<br />
                        <span style={{ color: "#a9a9a9" }}>{new Date(story.date).toLocaleString()}</span>
                    </div>
                </div>
                <div className="story-body">
                    {story.content}<br />
                    {story.hasimage && story.image_url && (
                        <img className="story-image" src={story.image_url} alt="Story" width={200} height={200} />
                    )}
                </div>
            </div>
            {/* Optional Comment Section */}
            <div className="comment-card">
                <div className="comment-header">
                    <img
                        className="profile-pic-comment"
                        src={story.profile_picture_url || "default-profile.png"} // Assuming comments use the same profile picture
                        alt="Profile"
                    />
                    <div>
                        <div>{story.username}</div>
                        <div>{new Date(story.date).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryCard;