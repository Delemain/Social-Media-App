package socialmediaapp.model;

import socialmediaapp.model.StoryModel;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_t")  // Ensure the table name matches your database
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    @Column(name = "username")
    private String username;

    @Column(name = "profilePictureUrl")
    private String profilePictureUrl;

    @OneToMany(mappedBy = "user")
    private Set<StoryModel> stories;

    // Getters and setters
    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

}