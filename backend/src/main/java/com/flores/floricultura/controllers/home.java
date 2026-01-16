package com.flores.floricultura.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class home {
    @GetMapping
    public String home() {
        return "Bem-vindo à Floricultura!";
    }
}
