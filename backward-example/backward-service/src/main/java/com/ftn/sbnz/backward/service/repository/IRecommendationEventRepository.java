package com.ftn.sbnz.backward.service.repository;

import com.ftn.sbnz.backward.model.models.RecommendationEvent;
import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.service.questionnaire.dto.RecommendationHistoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IRecommendationEventRepository extends JpaRepository<RecommendationEvent, Long> {
    @Query("select new com.ftn.sbnz.backward.service.questionnaire.dto.RecommendationHistoryDto(re.id, re.timestamp) from RecommendationEvent re where re.user.id = :userId")
    List<RecommendationHistoryDto> getRecommendationHistoryByUser(Long userId);
}
