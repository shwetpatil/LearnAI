package com.aichatbot.service;

import com.aichatbot.dto.ChatRequest;
import com.aichatbot.dto.ChatResponse;
import com.aichatbot.model.ChatMessage;
import com.aichatbot.model.User;
import com.aichatbot.repository.ChatMessageRepository;
import com.aichatbot.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OpenAiService openAiService;

    @Value("${openai.api.key:}")
    private String openAiApiKey;

    public ChatResponse processMessage(ChatRequest request, String userId) {
        try {
            // Get user
            User user = userRepository.findById(Long.parseLong(userId))
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate conversation ID if not provided
            String conversationId = request.getConversationId();
            if (conversationId == null || conversationId.isEmpty()) {
                conversationId = UUID.randomUUID().toString();
            }

            // Save user message
            ChatMessage userMessage = new ChatMessage();
            userMessage.setUser(user);
            userMessage.setConversationId(conversationId);
            userMessage.setContent(request.getMessage());
            userMessage.setRole(ChatMessage.MessageRole.USER);
            chatMessageRepository.save(userMessage);

            // Get conversation history
            List<ChatMessage> history = chatMessageRepository
                    .findByConversationIdOrderByCreatedAtAsc(conversationId);

            // Get AI response
            String aiResponse = openAiService.generateResponse(request.getMessage(), history);

            // Save assistant message
            ChatMessage assistantMessage = new ChatMessage();
            assistantMessage.setUser(user);
            assistantMessage.setConversationId(conversationId);
            assistantMessage.setContent(aiResponse);
            assistantMessage.setRole(ChatMessage.MessageRole.ASSISTANT);
            chatMessageRepository.save(assistantMessage);

            // Return response
            return new ChatResponse(aiResponse, conversationId, null);

        } catch (Exception e) {
            log.error("Error processing chat message", e);
            throw new RuntimeException("Failed to process message: " + e.getMessage());
        }
    }

    public List<ChatMessage> getConversationHistory(String conversationId) {
        return chatMessageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    public List<ChatMessage> getUserMessages(Long userId) {
        return chatMessageRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
