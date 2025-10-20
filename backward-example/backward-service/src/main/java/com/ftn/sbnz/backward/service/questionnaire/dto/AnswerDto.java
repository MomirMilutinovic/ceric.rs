package com.ftn.sbnz.backward.service.questionnaire.dto;

import com.ftn.sbnz.backward.model.models.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class AnswerDto {
    private Long id;
    private String answer;
    private String answerType;
    private List<String> allowedAnswers;
}
