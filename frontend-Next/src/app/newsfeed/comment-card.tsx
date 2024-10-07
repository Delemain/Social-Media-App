import React, { useState, useEffect } from "react";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";
import Image from 'next/image';

interface Comment {
    profile_picture_url: string;
    username: string;
    content: string;
    created_at: string;
}

function CommentCard({ commentID }: { commentID: string | number }) {

    const [comment, setComment] = useState<Comment | null>(null);

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
                <Image
                    className="profile-pic-story"
                    style={{
                        margin: '10px',
                        width: '30px',
                        height: '30px',
                    }}
                    src={comment?.profile_picture_url || '/default-profile.png'}
                    alt="Profile Picture"
                    width={30}
                    height={30}
                    objectFit="cover" // Optional: maintain aspect ratio and cover the specified area
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