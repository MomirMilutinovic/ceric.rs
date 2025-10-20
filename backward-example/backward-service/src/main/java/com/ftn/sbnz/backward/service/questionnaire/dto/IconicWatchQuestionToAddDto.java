package com.ftn.sbnz.backward.service.questionnaire.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class IconicWatchQuestionToAddDto {
    private Long questionId;
    private String positiveAnswer;
    private Double pointBoost;
    private List<Long> watchIds;
}
