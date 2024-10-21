package socialmediaapp.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class NewsfeedDao {

    @Autowired
    private JdbcTemplate jdbc;

    // Fetch a story by its ID, return a Map<String, Object> instead of a model
    public Map<String, Object> findStoryById(Long userID, Long storyID) {
        String sql = "SELECT username, profile_picture_url, content, date, has_image, image_url FROM story_t s join user_t u on s.userid = u.userid WHERE s.userid = ? and storyid = ?";
        return jdbc.queryForMap(sql, userID, storyID);
    }

    // Save a new story using raw SQL
    public int addStory(Long userID, String content, Boolean hasImage) {
        String sql = "INSERT INTO story_t (userid, content, has_image) VALUES (?, ?, ?)";
        return jdbc.update(sql, userID, content, hasImage);
    }

    // Fetch all stories ordered by date descending, return a list of maps
    public List<Map<String, Object>> findAllStories() {
        String sql = "SELECT userid, storyid FROM story_t ORDER BY date DESC";
        return jdbc.queryForList(sql);
    }

public int addComment(Long userID, Long storyID, Long posterID, Long commentParent, String content) {
        String sql = "INSERT INTO comment_t  VALUES (DEFAULT, ?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT, ?)";
        return jdbc.update(sql, userID, storyID, commentParent, content, posterID);
    }

public List<Map<String, Object>> findComments(Long userID, Long storyID) {
    String sql = "SELECT comment_id FROM comment_t WHERE user_id = ? and post_id = ? ORDER BY created_at DESC";
    return jdbc.queryForList(sql, userID, storyID);  // Pass userID and storyID as query parameters
}

    public Map<String, Object> findCommentById(Long commentID) {
            String sql = "SELECT username, profile_picture_url, content, created_at FROM comment_t c join user_t u on c.poster_id = u.userid WHERE comment_id = ?;";
            return jdbc.queryForMap(sql, commentID);
        }
}