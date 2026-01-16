package com.flores.floricultura.domain.product;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="products")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    
    @Column(name = "createdAt")
    private Date createdAt;
    
    @Column(name = "updatedAt")
    private Date updatedAt;
}   