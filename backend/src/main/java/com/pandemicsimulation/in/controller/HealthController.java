package com.pandemicsimulation.in.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/test")
    public String testEndpoint() {
        return "Service is running";
    }
}
