package com.ftn.sbnz.backward.service.questionnaire.repository;

import com.ftn.sbnz.backward.model.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
