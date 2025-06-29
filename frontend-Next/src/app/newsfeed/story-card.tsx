import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import "./NewsFeed.css";
import CommentCard from "@/app/newsfeed/comment-card";
import { Button } from "@/components/ui/button";

// Define the props interface
interface StoryCardProps {
    userID: string; // or number, depending on your actual data type
    storyID: string; // or number, depending on your actual data type
}

interface Story {
    profile_picture_url: string;
    username: string;
    content: string;
    has_image: boolean;
    image_url?: string; // Optional property
    date: string; // Assuming date is a string, modify if it's a different type
}

interface Comment {
    comment_id: string; // Assuming comment_id is a string; change type if needed
}

function StoryCard({ userID, storyID }: StoryCardProps) {
    const userId = localStorage.getItem("userid");
    const [story, setStory] = useState<Story | null>(null);
    const [commentIds, setCommentIds] = useState<Comment[]>([]);
    const [commentsExpanded /*, setCommentsExpanded*/] = useState(false);
    const [commentTabExpanded, setCommentTabExpanded] = useState(false);
    const [content, setContent] = useState("");

    // Fetch story details
    useEffect(() => {
        if (userID && storyID) {
            fetch(`http://localhost:8080/api/story/${userID}-${storyID}`)
                .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch story"))
                .then(data => setStory(data))
                .catch(error => console.error("Error fetching story:", error));
        }
    }, [userID, storyID]);

    // Fetch comment IDs for the story
    useEffect(() => {
        if (userID && storyID) {
            fetch(`http://localhost:8080/api/story/comments/${userID}-${storyID}`)
                .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch comment IDs"))
                .then(data => setCommentIds(data))
                .catch(error => console.error("Error fetching comment IDs:", error));
        }
    }, [userID, storyID]);

    const handlePostComment = async () => {
        const data = {
            userID: userID, // You may want to replace this with actual logged-in user ID
            storyID: storyID,
            posterID: userId,
            commentParent: null,
            content: content
        };

        try {
            const response = await fetch("http://localhost:8080/api/story/comment/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to post comment");
            }

            toggleCommentTab();
            setContent(""); // Clear the comment box after posting
            // Fetch updated comments
            fetch(`http://localhost:8080/api/story/comments/${userID}-${storyID}`)
                .then(response => response.json())
                .then(data => setCommentIds(data));

        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    const toggleCommentTab = () => setCommentTabExpanded(!commentTabExpanded);

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ marginTop: '10px' }}>
                <Card style={{
                    maxWidth: '500px',
                    borderRadius: '0',
                }}>
                    <CardTitle style={{
                        display: 'flex',
                        margin: '10px',
                        flexDirection: 'row',
                        alignItems: 'start',
                        fontSize: '14px',
                    }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="profile-pic-story"
                            src={story.profile_picture_url || '/default-profile.png'}
                            alt="Profile Picture"
                        />
                        <CardContent style={{ textAlign: 'left', justifyContent: 'start' }}>
                            <span style={{ color: "#1a8488", fontSize: 14 }}> {story.username} </span><br /><br />
                            {story.content}
                            <br /><br />
                            {story.has_image && story.image_url && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    className="story-image"
                                    src={story.image_url}
                                    alt="Story"
                                    width={200}
                                    height={200}
                                />
                            )}
                            <span style={{ color: "#a9a9a9", fontSize: 10 }}>
                                {new Date(story.date).toLocaleString()}</span>
                            &#8196;
                            <button className='comment-button'>Like</button>
                            &#8196;
                            <button className='comment-button' onClick={toggleCommentTab}>Comment</button>
                        </CardContent>
                    </CardTitle>
                </Card>
                <Card style={{
                    borderTop: '0px',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    maxHeight: commentTabExpanded ? '100px' : '0px',
                    overflowY: 'hidden',
                    transition: 'max-height 0.5s ease',

                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="profile-pic-story"
                        style={{ width: '30px', height: '30px', margin: '10px' }}
                        src={'/default-profile.png'}
                        alt="Profile Picture"
                    />
                    <textarea
                        style={{
                            fontSize: '10px',
                            margin: '5px',
                            padding: '5px',
                            width: '80%',
                            height: '20%',
                            resize: 'none'
                        }}
                        placeholder='Write comment here'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        onClick={handlePostComment}
                        style={{ margin: '10px', height: '30px', width: '60px', fontSize: '10px' }}>
                        Comment
                    </Button>
                </Card>
            </div>

            <div>
                <Card style={{
                    width: '500px',
                    maxHeight: commentsExpanded ? '600px' : '200px',
                    overflowY: 'auto',
                    transition: 'max-height 0.5s ease',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    borderTop: '0px'
                }}>


                    {commentIds.length > 0 ? (
                        commentIds.map((comment) => (
                            <CommentCard key={comment.comment_id} commentID={comment.comment_id} />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default StoryCard;