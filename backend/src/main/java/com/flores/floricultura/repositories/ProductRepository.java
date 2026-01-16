package com.flores.floricultura.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flores.floricultura.domain.product.Product;

public interface ProductRepository extends JpaRepository <Product, String> {
    
}
