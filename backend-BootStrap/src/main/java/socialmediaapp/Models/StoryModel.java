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

    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private String date;

    @Column(name = "hasImage")
    private Boolean hasImage;

    // Getters and setters

    public Long getStoryID() {return storyID;}
    public void setStoryID(Long storyID) {this.storyID = storyID;}

    public Long getUserID() {return userID;}
    public void setUserID(Long userID) {this.userID = userID;}

    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}

    public String getDate() {return date;}
    public void setDate(String date) {this.date = date;}

    public Boolean getHasImage() {return hasImage;}
    public void setHasImage(Boolean hasImage) {this.hasImage = hasImage;}
}