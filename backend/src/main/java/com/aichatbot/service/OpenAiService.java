package com.aichatbot.service;

import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    private OpenAiService openAiClient;

    private void initializeOpenAiService() {
        if (openAiClient == null && apiKey != null && !apiKey.isEmpty()) {
            openAiClient = new OpenAiService(apiKey);
        }
    }

    public String generateResponse(String userMessage, List<com.aichatbot.model.ChatMessage> history) {
        initializeOpenAiService();

        if (openAiClient == null) {
            return "OpenAI API key not configured. Please set openai.api.key in application.yml";
        }

        try {
            // Build conversation messages
            List<ChatMessage> messages = new ArrayList<>();

            // Add system message
            messages.add(new ChatMessage("system", 
                "You are a helpful AI assistant. Provide clear, concise, and accurate responses."));

            // Add conversation history
            for (com.aichatbot.model.ChatMessage msg : history) {
                String role = msg.getRole() == com.aichatbot.model.ChatMessage.MessageRole.USER 
                    ? "user" : "assistant";
                messages.add(new ChatMessage(role, msg.getContent()));
            }

            // Add current user message
            messages.add(new ChatMessage("user", userMessage));

            // Create request
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(messages)
                    .temperature(0.7)
                    .maxTokens(2000)
                    .build();

            // Get response
            String response = openAiClient.createChatCompletion(request)
                    .getChoices()
                    .get(0)
                    .getMessage()
                    .getContent();

            return response;

        } catch (Exception e) {
            log.error("Error calling OpenAI API", e);
            return "Sorry, I encountered an error while processing your request.";
        }
    }
}
