package com.aichatbot.controller;

import com.aichatbot.dto.ChatRequest;
import com.aichatbot.dto.ChatResponse;
import com.aichatbot.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(
            @RequestBody ChatRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            // Extract user ID from request or header
            String userId = request.getUserId();
            if (userId == null || userId.isEmpty()) {
                // For now, use a default user ID. In production, extract from JWT
                userId = "1";
            }

            ChatResponse response = chatService.processMessage(request, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Chat error: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/history/{conversationId}")
    public ResponseEntity<?> getHistory(@PathVariable String conversationId) {
        try {
            var history = chatService.getConversationHistory(conversationId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            log.error("Error fetching history: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
