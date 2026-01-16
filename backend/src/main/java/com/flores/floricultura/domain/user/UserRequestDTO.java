package com.flores.floricultura.domain.user;
// DTO para requisições de criação ou atualização de usuário record é uma forma concisa de definir uma classe imutável em Java

public record UserRequestDTO(String name, String email, String password) {
    
}
