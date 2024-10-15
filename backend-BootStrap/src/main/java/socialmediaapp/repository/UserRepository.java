package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import socialmediaapp.model.UserModel;


public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByEmail(String email);
}
