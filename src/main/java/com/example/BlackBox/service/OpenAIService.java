package com.example.BlackBox.service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class OpenAIService {
    // Create a Logger
    private static final Logger logger = Logger.getLogger(OpenAIService.class.getName());

    public String generateText(String prompt) {
        logger.info("Starting text generation with prompt: " + prompt);
        try {
            String openaiUrl = "https://api.openai.com/v1/engines/davinci/completions";
            String openaiKey = System.getenv("OPENAI_API_KEY");

            // Create the request body
            String body = "{ \"prompt\": \"" + prompt + "\", \"max_tokens\": 60 }";
            logger.info("Request body created: " + body);

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openaiKey);
            logger.info("Headers set");

            // Create the request
            HttpEntity<String> request = new HttpEntity<>(body, headers);
            logger.info("Request created: " + request.toString());

            // Call the OpenAI API
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.postForObject(openaiUrl, request, String.class);

            logger.info("API call made. Response received: " + result);

            // Return the result
            return result;

        } catch (Exception e) {
            // Log and handle the error appropriately
            logger.severe("Error generating text: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
