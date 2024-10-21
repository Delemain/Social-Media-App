package com.example.SocialMediaApp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import socialmediaapp.dao.NewsfeedDao;
import socialmediaapp.StoryController;
import socialmediaapp.SocialMediaAppApplication; // Correctly import the main application class
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest(classes = SocialMediaAppApplication.class) // Correct the syntax here
class SocialMediaAppApplicationTests {

    @InjectMocks
    private StoryController storyController;

    @Mock
    private NewsfeedDao newsfeedDao;

    @BeforeEach
    void setUp() {

    }

    @Test
    void testGetComments_Success() {
        // Arrange
        Long userID = 1L;
        Long storyID = 1L;
        List<Map<String, Object>> mockComments = Arrays.asList(
                Collections.singletonMap("commentID", 1L),
                Collections.singletonMap("commentID", 2L)
        );

        when(newsfeedDao.findComments(userID, storyID)).thenReturn(mockComments);

        // Act
        ResponseEntity<List<Map<String, Object>>> response = storyController.getComments(userID, storyID);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockComments, response.getBody());
    }

    @Test
    void testGetComments_NoContent() {
        // Arrange
        Long userID = 1L;
        Long storyID = 1L;

        when(newsfeedDao.findComments(userID, storyID)).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<List<Map<String, Object>>> response = storyController.getComments(userID, storyID);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testGetComment_Success() {
        // Arrange
        Long commentID = 1L;
        Map<String, Object> mockComment = new HashMap<>();
        mockComment.put("content", "This is a comment");

        when(newsfeedDao.findCommentById(commentID)).thenReturn(mockComment);

        // Act
        ResponseEntity<Map<String, Object>> response = storyController.getComment(commentID);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockComment, response.getBody());
    }

    @Test
    void testGetComment_NoContent() {
        // Arrange
        Long commentID = 1L;

        when(newsfeedDao.findCommentById(commentID)).thenReturn(null);

        // Act
        ResponseEntity<Map<String, Object>> response = storyController.getComment(commentID);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testAddComment_Success() {
        // Arrange
        Map<String, Object> commentData = new HashMap<>();
        commentData.put("userID", 1L);
        commentData.put("storyID", 1L);
        commentData.put("posterID", 2L);
        commentData.put("content", "This is a comment");

        when(newsfeedDao.addComment(1L, 1L, 2L, null, "This is a comment")).thenReturn(1);

        // Act
        ResponseEntity<String> response = storyController.addComment(commentData);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Story added successfully", response.getBody());
    }

    @Test
    void testAddComment_Failure() {
        // Arrange
        Map<String, Object> commentData = new HashMap<>();
        commentData.put("userID", 1L);
        commentData.put("storyID", 1L);
        commentData.put("posterID", 2L);
        commentData.put("content", "This is a comment");

        when(newsfeedDao.addComment(1L, 1L, 2L, null, "This is a comment")).thenReturn(0);

        // Act
        ResponseEntity<String> response = storyController.addComment(commentData);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to add story", response.getBody());
    }
}