package com.ftn.sbnz.backward.service.auth.security;

import com.ftn.sbnz.backward.model.models.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class PasswordChangeRequiredFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            chain.doFilter(request, response);
            return;
        }
        User user = (User) authentication.getPrincipal();

        if (user.isPasswordChangeRequired() && !request.getRequestURI().equals("/api/user/change-password")) {
           SecurityContextHolder.getContext().setAuthentication(null);
        }

        chain.doFilter(request, response);
    }
}
