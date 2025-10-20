package com.ftn.sbnz.backward.service.questionnaire.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuestionDto {
    private String question;
    private String answerType;
    private List<String> allowedAnswers;
}
