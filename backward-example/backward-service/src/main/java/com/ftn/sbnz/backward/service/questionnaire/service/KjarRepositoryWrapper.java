package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.kjar.IQuestionRepository;
import com.ftn.sbnz.backward.model.models.Question;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
public class KjarRepositoryWrapper implements IQuestionRepository {

    private final com.ftn.sbnz.backward.service.repository.IQuestionRepository questionRepository;

    @Override
    public Optional<Question> findById(Long id) {
        return questionRepository.findById(id);
    }
}
