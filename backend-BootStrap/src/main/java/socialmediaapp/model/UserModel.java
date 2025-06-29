package socialmediaapp.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_t")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Long userid;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "profile_picture_url", length = 255)
    private String profilePictureUrl;

    @Column(name = "bio", length = 500)
    private String bio;

    //Collection for FriendList
    @ElementCollection
    @CollectionTable(name = "user_friend", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "friend_id")
    private Set<Long> friendList = new HashSet<>();

    // Default constructor
    public UserModel() {}

    // Getters and Setters
    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    //Getter and Setter for FriendList
    public Set<Long> getFriendsList(){
        return friendList;
    }

    public boolean hasFriend(Long friendID){
        return friendID != null && friendList.contains(friendID);
    }

    public void addFriend(Long friendID){
        if (!hasFriend(friendID)){
            friendList.add(friendID);
        }
    }

    public void deleteFriend(Long friendID){
        if (hasFriend(friendID)){
            friendList.remove(friendID);
        }
    }
}
