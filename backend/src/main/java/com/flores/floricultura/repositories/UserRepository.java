package com.flores.floricultura.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.flores.floricultura.domain.user.User;


public interface  UserRepository extends JpaRepository <User, String>   {
    
    UserDetails findByEmail(String email);
}
