package com.ftn.sbnz.backward.service.repository;

import com.ftn.sbnz.backward.model.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByIdGreaterThan(Long idIsGreaterThan);
}


