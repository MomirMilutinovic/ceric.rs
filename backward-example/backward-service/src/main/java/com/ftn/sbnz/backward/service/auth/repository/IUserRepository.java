package com.ftn.sbnz.backward.service.auth.repository;

import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.model.models.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByRole(UserRole role);
    org.springframework.data.domain.Page<User> findAllByRole(UserRole role, Pageable pageable);
    @Query("select u from User u where u.username like %?1% or u.firstName like %?1% or u.lastName like %?1% or u.email like %?1%")
    Page<User> findAllByString(String search, Pageable pageable);
    @Query("select u from User u where u.role = ?1 and (u.username like %?2% or u.firstName like %?2% or u.lastName like %?2% or u.email like %?2%)")
    Page<User> findAllByRoleAndString(UserRole role, String search, Pageable pageable);

}

