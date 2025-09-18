package com.ftn.sbnz.backward.service.questionnaire.dto;

import com.ftn.sbnz.backward.model.models.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnswerDto {
    private Question answeredQuestion;
}
