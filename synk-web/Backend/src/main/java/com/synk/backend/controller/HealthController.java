package com.synk.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String health() {
        return "BACKEND IS RUNNING";
    }
    @GetMapping("/secured")
    public String secured() {
    return "SECURED BACKEND";
    }

}
