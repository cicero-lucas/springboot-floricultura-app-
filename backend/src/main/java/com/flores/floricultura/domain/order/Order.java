package com.flores.floricultura.domain.order;

import java.util.Date;

import com.flores.floricultura.domain.product.Product;
import com.flores.floricultura.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="orders")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Order {
    @Id
    private String id;
    private Integer quantity;
    private Double totalPrice;
    private Date orderDate;
    
    @ManyToOne
    @JoinColumn(name="clientId", nullable=false)
    private User client;

    @ManyToOne
    @JoinColumn(name="productId", nullable=false)
    private Product product;
}
