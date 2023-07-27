package com.example.BlackBox.controller;


import java.util.Map;

import com.example.BlackBox.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TutorialController {

    @Autowired
    OpenAIService openAIService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateText(@RequestBody Map<String, String> formData) {
        try {
            String openAIResponse = openAIService.generateText(formData);
            String processedResponse = processResponse(openAIResponse);
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