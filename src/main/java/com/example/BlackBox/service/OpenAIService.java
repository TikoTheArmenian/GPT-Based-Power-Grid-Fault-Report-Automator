package com.example.BlackBox.service;
import com.example.BlackBox.model.FaultReport;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OpenAIService {
    // Create a Logger
    private static final Logger logger = Logger.getLogger(OpenAIService.class.getName());

    public String generateText(FaultReport faultReport) {
        logger.info("Starting text generation with fault report: " + faultReport);
        try {
            String openaiUrl = "https://api.openai.com/v1/chat/completions";
            String prompt = String.format("You are an electrical engineer tasked with writing power grid fault report. You're report " +
                            "should be accurate, professional, to-the-point, and in the voice of a certified electrical engineer " +
                            "Incident Description: %s\nCause Identification: %s\nEquipment Involved: %s\n" +
                            "Protection Systems: %s\nSequence of Events: %s\nFault Duration and Impact: %s\nActions Taken: %s\n" +
                            "Analysis and Recommendations: %s\nData and Measurements: %s",
                    faultReport.getIncidentDescription(), faultReport.getCauseIdentification(), faultReport.getEquipmentInvolved(),
                    faultReport.getProtectionSystems(), faultReport.getSequenceOfEvents(), faultReport.getFaultDurationAndImpact(),
                    faultReport.getActionsTaken(), faultReport.getAnalysisAndRecommendations(), faultReport.getDataAndMeasurements());

            System.out.println(prompt);

//            String requestBodyGPTTurbo = String.format("""
//                    {
//                    "model": "gpt-3.5-turbo",
//                    "messages": [
//                        {
//                            "role": "system",
//                            "content": "You are a helpful assistant."
//                        },
//                        {
//                            "role": "user",
//                            "content": "%s"
//                        }
//                    ],
//                    "max_tokens": 60,
//                    "temperature": 0.7
//                    }""", prompt);

            String openaiKey = System.getenv("OPENAI_API_KEY");

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openaiKey);

            ObjectMapper objectMapper = new ObjectMapper();

            ObjectNode requestBodyGPTTurbo = objectMapper.createObjectNode();
            requestBodyGPTTurbo.put("model", "gpt-3.5-turbo");
            requestBodyGPTTurbo.put("max_tokens", 1024);
            requestBodyGPTTurbo.put("temperature", 0.7);

            ArrayNode messagesNode = requestBodyGPTTurbo.putArray("messages");

            ObjectNode systemMessageNode = messagesNode.addObject();
            systemMessageNode.put("role", "system");
            systemMessageNode.put("content", "You are a helpful assistant.");

            ObjectNode userMessageNode = messagesNode.addObject();
            userMessageNode.put("role", "user");
            userMessageNode.put("content", prompt);

            String body = objectMapper.writeValueAsString(requestBodyGPTTurbo);  // Convert to JSON string

            HttpEntity<String> request = new HttpEntity<>(body, headers);

            // Call the OpenAI API
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.postForObject(openaiUrl, request, String.class);

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
