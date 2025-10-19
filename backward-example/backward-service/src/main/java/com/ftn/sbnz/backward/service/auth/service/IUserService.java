package com.ftn.sbnz.backward.service.auth.service;

import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.model.models.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.ftn.sbnz.backward.service.auth.dto.UserRequest;

import java.util.List;
import java.util.Optional;


public interface IUserService {
    User findById(Long id);
    Optional<User> findByUsername(String username);
    List<User> findAll();
    Page<User> findAll(UserRole role, String searchString, Pageable pageable);

    void createSuperAdmin();

    User save(UserRequest userRequest, UserRole role);

    User changePassword(User user, String oldPassword, String newPassword);
}
