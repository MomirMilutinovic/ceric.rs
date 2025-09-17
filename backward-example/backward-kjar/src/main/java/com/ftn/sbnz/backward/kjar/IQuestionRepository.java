package com.ftn.sbnz.backward.kjar;

import com.ftn.sbnz.backward.model.models.Question;

import java.util.Optional;

public interface IQuestionRepository {
    Optional<Question> findById(Long id);
}
