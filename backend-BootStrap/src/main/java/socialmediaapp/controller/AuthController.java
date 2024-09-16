package socialmediaapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialmediaapp.model.LoginRequest;
import socialmediaapp.model.UserModel;
import socialmediaapp.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        
        UserModel user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(400).body("Email already in use");
        }

        // Save the new user to the database
        userRepository.save(user);
        return ResponseEntity.ok("Registration successful!");
    }

}
