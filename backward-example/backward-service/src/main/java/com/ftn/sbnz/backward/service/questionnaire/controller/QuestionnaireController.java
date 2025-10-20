package com.ftn.sbnz.backward.service.questionnaire.controller;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.model.models.Watch;
import com.ftn.sbnz.backward.service.questionnaire.dto.AnswerDto;
import com.ftn.sbnz.backward.service.questionnaire.dto.RecommendationHistoryDto;
import com.ftn.sbnz.backward.service.questionnaire.dto.RecommendationsDto;
import com.ftn.sbnz.backward.service.questionnaire.dto.TrendingWatchesDto;
import com.ftn.sbnz.backward.service.questionnaire.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questionnaire")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;
    private final String SESSION_ID_COOKIE_NAME = "kieSessionId";

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @PostMapping("/start")
    public ResponseEntity<Question> startQuestionnaire(HttpServletResponse response) {
        String sessionId = questionnaireService.startQuestionnaire();
        response.addCookie(new Cookie(SESSION_ID_COOKIE_NAME, sessionId));
        Optional<Question> firstQuestion = questionnaireService.getNext(sessionId);
        return ResponseEntity.ok(firstQuestion.orElseThrow(IllegalStateException::new));
    }

    @PostMapping("/answer")
    public ResponseEntity answerQuestionnaire(@RequestBody AnswerDto answerDto, @CookieValue(name = SESSION_ID_COOKIE_NAME, required = true) String sessionId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Question answeredQuestion = new Question();
        answeredQuestion.setId(answerDto.getId());
        answeredQuestion.setAnswerType(answerDto.getAnswerType());
        answeredQuestion.setAllowedAnswers(answerDto.getAllowedAnswers());
        answeredQuestion.setAnswer(answerDto.getAnswer());
        questionnaireService.answer(answeredQuestion, sessionId);
        Optional<Question> nextQuestion = questionnaireService.getNext(sessionId);
        if (nextQuestion.isPresent()) {
            return ResponseEntity.ok(nextQuestion);
        }
        return ResponseEntity.ok(
            questionnaireService.getRecommendations(sessionId, user)
        );
    }

    @GetMapping("/trending-watches")
    public ResponseEntity<TrendingWatchesDto> trendingWatches() {
        return ResponseEntity.ok(new TrendingWatchesDto(questionnaireService.getTrendingWatches()));
    }

    @GetMapping("/recommendations/{eventId}")
    public ResponseEntity<RecommendationsDto> getRecommendations(@PathVariable Long eventId) {
        Optional<RecommendationsDto> recommendations = questionnaireService.getRecommendedWatches(eventId);
        if (recommendations.isPresent()) {
            return ResponseEntity.ok(recommendations.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/history")
    public ResponseEntity<List<RecommendationHistoryDto>> getRecommendationHistory() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(this.questionnaireService.getRecommendationHistory(user));
    }

}
