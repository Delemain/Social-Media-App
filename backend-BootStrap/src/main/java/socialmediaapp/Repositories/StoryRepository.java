package socialmediaapp.repository;

import socialmediaapp.model.StoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends JpaRepository<StoryModel, Long> {}