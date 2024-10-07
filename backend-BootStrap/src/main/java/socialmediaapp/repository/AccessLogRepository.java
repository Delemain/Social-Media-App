package socialmediaapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import socialmediaapp.model.AccessLog;
import java.util.List;

public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {
    List<AccessLog> findByUserid(Long userid);
}
