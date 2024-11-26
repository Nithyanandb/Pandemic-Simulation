package com.pandemicsimulation.in.controller;


import com.pandemicsimulation.in.Model.CovidData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/simulation")
@CrossOrigin(origins = "*")

public class CovidDataController {
    private final com.pandemicsimulation.in.Service.CovidDataService covidDataService;

    public CovidDataController(com.pandemicsimulation.in.Service.CovidDataService covidDataService) {
        this.covidDataService = covidDataService;
    }
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Application is up and running");
    }

    @GetMapping("/data")
    public CompletableFuture<List<CovidData>> getSimulationData() {
        return covidDataService.fetchAllCovidData()
                .exceptionally(ex -> {

                    System.err.println("Error fetching data: " + ex.getMessage());
                    return new ArrayList<>();
                });
    }
}
