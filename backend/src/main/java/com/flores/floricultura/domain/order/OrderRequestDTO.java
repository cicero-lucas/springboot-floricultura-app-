package com.flores.floricultura.domain.order;

public record OrderRequestDTO(String clientId, String productId, Integer quantity) {
    
}
