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
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.List;

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

            // Update fields
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setBio(updatedUser.getBio());
            
            
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(updatedUser.getPassword()); 
            }

            // Save updated user to the repository
            userRepository.save(existingUser);

            AccessLog updateLog = new AccessLog(existingUser.getUserid(), "update", LocalDateTime.now());
            accessLogRepository.save(updateLog);

            return ResponseEntity.ok("User details updated successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }


}
