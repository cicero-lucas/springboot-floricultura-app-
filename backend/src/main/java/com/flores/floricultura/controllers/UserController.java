package com.flores.floricultura.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flores.floricultura.domain.user.User;
import com.flores.floricultura.domain.user.UserRequestDTO;
import com.flores.floricultura.domain.user.UserResponseDTO;
import com.flores.floricultura.service.userService.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/register")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@RequestBody @Valid UserRequestDTO body) {
        User user = this.userService.createUser(body);
        return ResponseEntity.ok(new UserResponseDTO(user));
    }
}
