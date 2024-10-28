package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import socialmediaapp.model.Message;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
