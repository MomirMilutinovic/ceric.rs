package com.ftn.sbnz.backward.service.questionnaire.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IconicWatchQuestionsDto {
    private Long id;
    private String question;
    private String positiveAnswer;
    private Double pointBoost;
    private List<String> watches;
}
