package com.ftn.sbnz.backward.service.questionnaire.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationHistoryDto {
    private Long eventId;
    private Date timestamp;
}
