package socialmediaapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import socialmediaapp.model.LoginRequest;
import socialmediaapp.model.AccessLog;
import socialmediaapp.model.UserModel;
import socialmediaapp.repository.UserRepository;
import socialmediaapp.repository.AccessLogRepository;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccessLogRepository accessLogRepository; // Add AccessLogRepository

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        
    //     UserModel user = userRepository.findByEmail(loginRequest.getEmail());

    //     if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
    //         return ResponseEntity.ok("Login successful!");
    //     } else {
    //         return ResponseEntity.status(401).body("Invalid credentials");
    //     }
    // }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    
    UserModel user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // Log successful login to access_logs
            AccessLog loginLog = new AccessLog(user.getUserid(), "login", LocalDateTime.now());
            accessLogRepository.save(loginLog);

            // Return the user's ID and other relevant information upon successful login
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("userid", user.getUserid());
            // response.put("username", user.getUsername());
            // response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(400).body("Email already in use");
        }
        
        // Save the new user to the database
        userRepository.save(user);

        // AccessLog registerLog = new AccessLog(user.getUserid(), "Account Created", LocalDateTime.now());
        // accessLogRepository.save(registerLog);

        return ResponseEntity.ok("Registration successful!");
    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long userid) {
        Optional<UserModel> user = userRepository.findById(userid);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    // Delete user by ID
    @DeleteMapping("/user/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userid) {
        if (userRepository.existsById(userid)) {
            userRepository.deleteById(userid);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @GetMapping("/logs/{userid}")
    public ResponseEntity<?> getUserLogs(@PathVariable Long userid) {
    List<AccessLog> logs = accessLogRepository.findByUserid(userid);
        if (logs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No logs found for this user.");
        } else {
            return ResponseEntity.ok(logs);
        }
    }

    @PutMapping("/user/{userid}")
    public ResponseEntity<?> updateUser(@PathVariable Long userid, @RequestBody UserModel updatedUser) {
        Optional<UserModel> existingUserOptional = userRepository.findById(userid);
        if (existingUserOptional.isPresent()) {
            UserModel existingUser = existingUserOptional.get();

            if (updatedUser.getFirstName() == null || updatedUser.getFirstName().isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("First name cannot be empty");
            }
            if (updatedUser.getLastName() == null || updatedUser.getLastName().isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Last name cannot be empty");
            }
            if (updatedUser.getUsername() == null || updatedUser.getUsername().isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username cannot be empty");
            }
            if (updatedUser.getEmail() == null || updatedUser.getEmail().isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email cannot be empty");
            }
            if (updatedUser.getPassword() == null || updatedUser.getPassword().isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password cannot be empty");
            }

            // Update fields
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setBio(updatedUser.getBio());
            
            // if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            //     existingUser.setPassword(updatedUser.getPassword()); 
            // }

            // Save updated user to the repository
            userRepository.save(existingUser);

            AccessLog updateLog = new AccessLog(existingUser.getUserid(), "update", LocalDateTime.now());
            accessLogRepository.save(updateLog);

            return ResponseEntity.ok("User details updated successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @PostMapping("/logout/{userid}")
    public ResponseEntity<?> logout(@PathVariable Long userid) {
        // Log the logout action to access_logs
        Optional<UserModel> user = userRepository.findById(userid);
        if (user.isPresent()) {
            AccessLog logoutLog = new AccessLog(userid, "logout", LocalDateTime.now());
            accessLogRepository.save(logoutLog);
            return ResponseEntity.ok(Map.of("message", "Logout successful"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    //Controller for Friend Request and Friendlist Management

    //FriendList
    //
    //
    @GetMapping("/friendslist/{userid}")
    public ResponseEntity<?> getFriendslist(@PathVariable Long userid){
        Optional<UserModel> userOptional = userRepository.findById(userid);
        if(userOptional.isPresent()){
            UserModel user = userOptional.get();
            //retrieve ID list of friends
            Set<Long> friendsListID = user.getFriendsList();
            List<UserModel> friendsList = new ArrayList<>();
            for (Long friendID : friendsListID) {
                Optional<UserModel> friendOptional = userRepository.findById(friendID);
                if (friendOptional.isPresent()) {
                    friendsList.add(friendOptional.get());
                }
            }
            return ResponseEntity.ok(friendsList);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/user-search/{searchName}/{userid}")
    public ResponseEntity<?> getUserSearch(@PathVariable String searchName, @PathVariable Long userid){
        Optional<UserModel> userOptional = userRepository.findById(userid);
        if(userOptional.isPresent()){
            UserModel user = userOptional.get();
            Set<Long> friendsListID = user.getFriendsList();
            Set<UserModel> usersList = new HashSet<UserModel>();
            if (searchName == null || searchName.trim().isEmpty()){
                usersList.addAll(userRepository.findAll());
            } else {
                usersList.addAll(userRepository.findByFirstNameContaining(searchName));
                usersList.addAll(userRepository.findByLastNameContaining(searchName));
                usersList.addAll(userRepository.findByUsernameContaining(searchName));
            }

            Iterator<UserModel> iterator = usersList.iterator();
            while (iterator.hasNext()) {
                UserModel tempModel = iterator.next();
                if (friendsListID.contains(tempModel.getUserid()) || tempModel.getUserid() == user.getUserid()) {
                    iterator.remove();
                }
            }

            List<UserModel> finalList = new ArrayList<>(usersList);
            return ResponseEntity.ok(finalList);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/friendslist/delete/{userid}/{friendID}")
    public ResponseEntity<String> deleteFriend(@PathVariable Long userid, @PathVariable Long friendID) {
        Optional<UserModel> userOptional = userRepository.findById(userid);
        Optional<UserModel> friendOptional = userRepository.findById(friendID);
        if (userOptional.isPresent() && friendOptional.isPresent()){
            UserModel user = userOptional.get();
            UserModel friend = friendOptional.get();

            if (user.hasFriend(friend.getUserid()) && friend.hasFriend(user.getUserid())){
                user.deleteFriend(friend.getUserid());
                friend.deleteFriend(user.getUserid());

                userRepository.save(user);  // Save the updated user
                userRepository.save(friend); // Save the updated friend

                return ResponseEntity.ok("Friend deleted successfully.");
            } else {
                return ResponseEntity.status(404).body("Friend not found.");
            }
        }
        else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/user-search/add/{userid}/{friendID}")
    public ResponseEntity<String> addFriend(@PathVariable Long userid, @PathVariable Long friendID){
        Optional<UserModel> userOptional = userRepository.findById(userid);
        Optional<UserModel> friendOptional = userRepository.findById(friendID);

        if (userOptional.isPresent() && friendOptional.isPresent()) {
            UserModel user = userOptional.get();
            UserModel friend = friendOptional.get();

            if (!(user.hasFriend(friend.getUserid())) && !(friend.hasFriend(user.getUserid()))){
                user.addFriend(friend.getUserid());
                friend.addFriend(user.getUserid());

                userRepository.save(user);  // Save the updated user
                userRepository.save(friend); // Save the updated friend

                return ResponseEntity.ok("Friend added successfully.");
            } else {
                return ResponseEntity.status(404).body("Friend not found.");
            }
        }
        else {
            return ResponseEntity.status(404).body(null);
        }
    }


}
