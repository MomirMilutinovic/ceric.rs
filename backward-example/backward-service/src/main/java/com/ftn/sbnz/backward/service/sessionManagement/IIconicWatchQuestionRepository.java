package com.ftn.sbnz.backward.service.sessionManagement;

import com.ftn.sbnz.backward.model.models.IconicWatchQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IIconicWatchQuestionRepository extends JpaRepository<IconicWatchQuestion, Long> {

    @Query("select new com.ftn.sbnz.backward.service.sessionManagement.IconicWatchQuestionDto(question.id, watch.id, iconic_watch_question.positiveAnswer, iconic_watch_question.pointBoost) from IconicWatchQuestion iconic_watch_question join iconic_watch_question.watches watch join iconic_watch_question.question question")
    List<IconicWatchQuestionDto> getIconicWatchQuestionDtos();
}
