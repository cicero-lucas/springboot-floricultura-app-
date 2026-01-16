package com.flores.floricultura.service.userService;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flores.floricultura.domain.user.User;
import com.flores.floricultura.domain.user.UserRequestDTO;
import com.flores.floricultura.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(UserRequestDTO data) {
        if (data.name() == null || data.email() == null || data.password() == null) {
            throw new IllegalArgumentException("Nome, email e senha são obrigatórios");
        }
        
        // Verifica se o email já existe
        if (this.userRepository.findByEmail(data.email()) != null) {
            throw new IllegalArgumentException("Email já cadastrado no sistema");
        }
        
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(data.name());
        user.setEmail(data.email());
        user.setPassword(this.passwordEncoder.encode(data.password()));
        user.setCreatedAt(new java.util.Date());

        return userRepository.save(user);
    }
}
