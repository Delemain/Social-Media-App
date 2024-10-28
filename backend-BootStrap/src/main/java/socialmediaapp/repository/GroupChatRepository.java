package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import socialmediaapp.model.GroupChat;


@Repository
public interface GroupChatRepository extends JpaRepository<GroupChat, Long> {
}
