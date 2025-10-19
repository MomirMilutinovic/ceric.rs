package com.ftn.sbnz.backward.service.repository;

import com.ftn.sbnz.backward.model.models.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRecommendationRepository extends JpaRepository<Recommendation, Long> {
}
