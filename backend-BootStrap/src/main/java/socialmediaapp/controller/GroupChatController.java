package socialmediaapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import socialmediaapp.model.GroupChat;
import socialmediaapp.repository.GroupChatRepository;

@RestController
@RequestMapping("/api/groupchats")
public class GroupChatController {

    private final GroupChatRepository GroupChatRepository;

    public GroupChatController(GroupChatRepository GroupChatRepository) {
        this.GroupChatRepository = GroupChatRepository;
    }

    @PostMapping("/saveAll")
    public ResponseEntity<?> saveAllMessages(@RequestBody List<GroupChat> group_chats) {
        GroupChatRepository.deleteAll();
        GroupChatRepository.saveAll(group_chats);
        return ResponseEntity.ok("Messages saved successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<GroupChat>> getAllMessages() {
        List<GroupChat> messages = GroupChatRepository.findAll();
        return ResponseEntity.ok(messages);
    }
}
