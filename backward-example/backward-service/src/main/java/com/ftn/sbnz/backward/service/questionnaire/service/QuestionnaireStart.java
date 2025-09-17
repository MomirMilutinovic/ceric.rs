package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.model.models.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionnaireStart {
    private String questionnaireId;
    private Question firstQuestion;
}
