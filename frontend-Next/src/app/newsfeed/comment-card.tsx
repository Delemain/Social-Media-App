import React, { useState, useEffect } from "react";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";

function CommentCard({ commentID }) {
    const [comment, setComment] = useState(null);  // Initialize as null for single comment or empty array for multiple

    useEffect(() => {
        // Check that userID, storyID, and commentID are defined
        if (commentID) {
            fetch(`http://localhost:8080/api/story/comment/${commentID}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Failed to fetch comments");
                    }
                })
                .then(data => setComment(data))
                .catch(error => console.error("Error fetching comments:", error));
        }
    }, ); // Ensure that it re-fetches when IDs change

    if (!comment) {
        return <div>comment didnt load...</div>;
    }

    return (
        <div className={cn(
            "border text-card-foreground",
            className)}
        style = {{
            borderTop: '0px',
            borderLeft: '0px',
            borderRight: '0px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0'
            }}>
                <img
                    className="profile-pic-story"
                    style={{
                        margin: '10px',
                        width: '30px',
                        height: '30px'
                    }}
                    src={comment.profile_picture_url || '/default-profile.png'}
                    alt="Profile Picture"
                />
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    textAlign: 'start'
                }}>
                        <div>
                            <span style={{ color: "#1a8488", fontSize: 12}}> {comment.username} </span>
                            <span style={{ fontSize: 10}}> {comment.content} </span>
                        </div>
                        <span style={{ color: "#a9a9a9", fontSize: 8}}>
                            {new Date(comment.created_at).toLocaleString()}
                        </span>
                </div>
            </div>
        </div>
);
}

export default CommentCard;