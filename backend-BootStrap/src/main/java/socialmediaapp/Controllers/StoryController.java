package socialmediaapp;

import socialmediaapp.model.StoryModel;
import socialmediaapp.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @GetMapping("/story/{storyID}")
    public ResponseEntity<StoryModel> getStory(@PathVariable Long storyID) {
        Optional<StoryModel> story = storyRepository.findById(storyID);

        if (story.isPresent()) {
            return new ResponseEntity<>(story.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/story")
    public ResponseEntity<String> addStory(@RequestParam Long userID, @RequestParam String content,
                                           @RequestParam String date, @RequestParam Boolean hasImage) {
        StoryModel story = new StoryModel();
        story.setUserID(userID);
        story.setContent(content);
        story.setDate(date);
        story.setHasImage(hasImage);

        storyRepository.save(story);
        return new ResponseEntity<>("Story added successfully", HttpStatus.CREATED);
    }
}