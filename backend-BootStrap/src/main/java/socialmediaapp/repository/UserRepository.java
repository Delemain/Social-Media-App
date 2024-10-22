package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import socialmediaapp.model.UserModel;

import java.util.Set;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    // Check if an email already exists
    UserModel findByEmail(String email);
    // Check if a username already exists
    UserModel findByUsername(String username);

    //Functions for FriendList
    Set<UserModel> findByFirstNameContaining(String firstName);

    Set<UserModel> findByLastNameContaining(String lastName);

    Set<UserModel> findByUsernameContaining(String username);
}

