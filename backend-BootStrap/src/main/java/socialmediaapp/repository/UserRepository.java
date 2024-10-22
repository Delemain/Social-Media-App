package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import socialmediaapp.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    // Check if an email already exists
    UserModel findByEmail(String email);
    
    // Check if a username already exists
    UserModel findByUsername(String username);
}
