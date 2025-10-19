package com.ftn.sbnz.backward.service.repository;

import com.ftn.sbnz.backward.model.models.RecommendationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRecommendationEventRepository extends JpaRepository<RecommendationEvent, Long> {
}
