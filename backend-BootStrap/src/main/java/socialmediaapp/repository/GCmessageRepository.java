package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import socialmediaapp.model.GCMessage;


@Repository
public interface GCmessageRepository extends JpaRepository<GCMessage, Long> {
}
