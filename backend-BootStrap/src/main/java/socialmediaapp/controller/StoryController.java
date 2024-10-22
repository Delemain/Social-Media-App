package socialmediaapp.controller;

import socialmediaapp.dao.NewsfeedDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private NewsfeedDao newsfeedDao;

    // Fetch a story by ID, returning a map of the data
    @GetMapping("/{userID}-{storyID}")
    public ResponseEntity<Map<String, Object>> getStory(@PathVariable Long userID,@PathVariable Long storyID) {
        Map<String, Object> story = newsfeedDao.findStoryById(userID, storyID);

        if (story != null && !story.isEmpty()) {
            return new ResponseEntity<>(story, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // Add a new story by accepting request parameters
    @PostMapping("/post")
    public ResponseEntity<String> addStory(@RequestBody Map<String, Object> storyData) {
        Long userID = Long.parseLong(storyData.get("userID").toString());
        String content = (String) storyData.get("content");
        Boolean hasImage = (Boolean) storyData.get("hasImage");

        int result = newsfeedDao.addStory(userID, content, hasImage);  // Adjust date format as needed

        if (result > 0) {
            return new ResponseEntity<>("Story added successfully", HttpStatus.CREATED);
        } else {
                return new ResponseEntity<>("Failed to add story", HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch all stories, returning a list of maps
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllStories() {
        List<Map<String, Object>> stories = newsfeedDao.findAllStories();

        if (stories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/comments/{userID}-{storyID}")
            public ResponseEntity<List<Map<String, Object>>> getComments(@PathVariable Long userID,@PathVariable Long storyID) {
                List<Map<String, Object>> comments = newsfeedDao.findComments(userID, storyID);

                if (comments.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                return new ResponseEntity<>(comments, HttpStatus.OK);
                }
            }

    @GetMapping("/comment/{commentID}")
        public ResponseEntity<Map<String, Object>> getComment(@PathVariable Long commentID) {
            Map<String, Object> comment = newsfeedDao.findCommentById(commentID);

            if (comment!= null && !comment.isEmpty()) {
                return new ResponseEntity<>(comment, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }

    @PostMapping("/comment/post")
        public ResponseEntity<String> addComment(@RequestBody Map<String, Object> commentData) {
            Long userID = Long.parseLong(commentData.get("userID").toString());
            Long storyID = Long.parseLong(commentData.get("storyID").toString());
            Long posterID = Long.parseLong(commentData.get("posterID").toString());
            Long commentParent = null;
            if (commentData.get("commentParent") != null) Long.parseLong(commentData.get("commentParent").toString());
            String content = (String) commentData.get("content");

            int result = newsfeedDao.addComment(userID, storyID, posterID, commentParent, content);

            if (result > 0) {
                return new ResponseEntity<>("Story added successfully", HttpStatus.CREATED);
            } else {
                    return new ResponseEntity<>("Failed to add story", HttpStatus.BAD_REQUEST);
            }
        }
}
