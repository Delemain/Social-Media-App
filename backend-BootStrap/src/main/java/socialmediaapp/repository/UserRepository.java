package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import socialmediaapp.model.UserModel;

import java.util.Set;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByEmail(String email);

    //Functions for FriendList
    Set<UserModel> findByFirstNameContaining(String firstName);

    Set<UserModel> findByLastNameContaining(String lastName);

    Set<UserModel> findByUsernameContaining(String username);
}

