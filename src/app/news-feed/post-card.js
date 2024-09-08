import React, {useState} from "react";
import "./NewsFeed.css";

function PostCard() {
    const [userID, setUserID] = useState('');
    const [content, setContent] = useState('');

    const handlePostStory = async () => {
        const formData = new FormData();
        formData.append('userID', userID);
        formData.append('content', content);
        formData.append('hasImage', false);

        try {
            const response = await fetch("/api/stories/story", {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setUserID('');
                setContent('');
                window.location.reload();
            } else {
                alert('Failed to add story');
            }
        } catch (error) {
            console.error('Error posting story:', error);
            alert('Error posting story');
        }
    };

    return (
        <div className="post-card">
            <form className="post-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="post-input"
                    placeholder="User ID"
                    onChange={(e) => setUserID(e.target.value)}
                /><br/><br/>
                <textarea
                    className="post-text"
                    placeholder="Whats on your mind?"
                    onChange={(e) => setContent(e.target.value)}
                /><br/>

                <div className="post-button-area">
                    <div className="post-button" onClick={handlePostStory}>Post Story</div>
                </div>
            </form>
        </div>
    );
}

export default PostCard;