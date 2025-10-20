package com.ftn.sbnz.backward.service.questionnaire.dto;

import com.ftn.sbnz.backward.model.models.Recommendation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationsDto {
    private List<Recommendation> recommendations;
    private Long eventId;
    private Date timestamp;
}
