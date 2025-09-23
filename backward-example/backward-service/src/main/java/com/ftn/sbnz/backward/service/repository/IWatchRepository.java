package com.ftn.sbnz.backward.service.repository;

import com.ftn.sbnz.backward.model.models.Watch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWatchRepository extends JpaRepository<Watch, Long> {
}
