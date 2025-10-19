package com.ftn.sbnz.backward.service.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ftn.sbnz.backward.service.auth.model.VerificationLink;

import java.util.Optional;

public interface IVerificationLinkRepository extends JpaRepository<VerificationLink, Long> {
    Optional<VerificationLink> findById(Long id);
}
