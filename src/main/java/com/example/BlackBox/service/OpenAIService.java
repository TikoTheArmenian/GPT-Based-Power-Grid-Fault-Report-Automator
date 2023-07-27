package com.example.BlackBox.service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.logging.Logger;

@Service
public class OpenAIService {
    // Create a Logger
    private static final Logger logger = Logger.getLogger(OpenAIService.class.getName());

    public String generateText(Map<String, String> formData) {
        try {
            String openaiUrl = "https://api.openai.com/v1/engines/gpt-3.5-turbo-0301/completions";
            String openaiKey = System.getenv("OPENAI_API_KEY");
            System.out.println("KEY: " + System.getenv("OPENAI_API_KEY"));

            // Create the prompt based on form data
            StringBuilder promptBuilder = new StringBuilder();
            for (Map.Entry<String, String> entry : formData.entrySet()) {
                promptBuilder.append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
            }
            String prompt = promptBuilder.toString();

            // Create the request body
            String body = "{ \"prompt\": \"" + prompt + "\", \"max_tokens\": 60 }";

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openaiKey);

            // Create the request
            HttpEntity<String> request = new HttpEntity<>(body, headers);

            // Call the OpenAI API
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.postForObject(openaiUrl, request, String.class);


            // Return the result
            return result;

        } catch (Exception e) {
            // Log and handle the error appropriately
            e.printStackTrace();
            return null;
        }
    }
}
