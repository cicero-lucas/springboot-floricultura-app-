package com.flores.floricultura.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.flores.floricultura.domain.user.User;
import com.flores.floricultura.infra.token.TokenService;
import com.flores.floricultura.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // Extrai o token do header Authorization
        var token = this.recoverToken(request);
        
        if (token != null) {
            // Valida e extrai o subject (email) do token
            var subject = tokenService.validateToken(token);
            
            if (subject != null) {
                // Busca o usuário no banco
                User user = (User) userRepository.findByEmail(subject);
                
                if (user != null) {
                    // Cria autenticação e coloca no contexto de segurança
                    var authentication = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
