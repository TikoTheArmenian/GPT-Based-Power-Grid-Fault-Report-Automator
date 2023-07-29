package com.example.BlackBox.controller;

import com.example.BlackBox.model.FaultReport;
import com.example.BlackBox.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TutorialController {

    @Autowired
    OpenAIService openAIService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateText(@RequestBody FaultReport faultReport) {

        try {
            // Use the OpenAIService to generate text from the OpenAI API
            String openAIResponse = openAIService.generateText(faultReport);

            // Process the OpenAI API response as needed
            String processedResponse = processResponse(openAIResponse);

            // Return the processed response
            return new ResponseEntity<>(processedResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // A placeholder method for processing the OpenAI API response
    private String processResponse(String response) {
        return response;
    }
}
