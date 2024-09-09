package socialmediaapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "story_t")
public class StoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyID;

    @Column(name = "userID")
    private Long userID;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "userID", insertable = false, updatable = false)  // Defines the foreign key relationship
    private UserModel user;

    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private String date;

    @Column(name = "hasImage")
    private Boolean hasImage;

    @Column(name = "imageUrl")
    private String imageUrl;

    // Getters and setters

    public Long getStoryID() {
        return storyID;
    }

    public void setStoryID(Long storyID) {
        this.storyID = storyID;
    }

    public Long getUserID() {
            return userID;
        }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getHasImage() {
        return hasImage;
    }

    public void setHasImage(Boolean hasImage) {
        this.hasImage = hasImage;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}