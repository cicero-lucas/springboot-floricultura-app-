package com.flores.floricultura.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flores.floricultura.domain.order.Order;

public interface OrderRepository extends  JpaRepository<Order,String> {
    
}
