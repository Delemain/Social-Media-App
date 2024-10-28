package socialmediaapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import socialmediaapp.model.GCMessage;
import socialmediaapp.repository.GCmessageRepository;

@RestController
@RequestMapping("/api/gcmessages")
public class GCMessageController {

    private final GCmessageRepository GCmessageRepository;

    public GCMessageController(GCmessageRepository GCmessageRepository) {
        this.GCmessageRepository = GCmessageRepository;
    }

    @PostMapping("/saveAll")
    public ResponseEntity<?> saveAllMessages(@RequestBody List<GCMessage> gc_messages) {
        GCmessageRepository.deleteAll();
        GCmessageRepository.saveAll(gc_messages);
        return ResponseEntity.ok("Messages saved successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<GCMessage>> getAllMessages() {
        List<GCMessage> messages = GCmessageRepository.findAll();
        return ResponseEntity.ok(messages);
    }
}
