package com.ftn.sbnz.backward.service.questionnaire.controller;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.service.questionnaire.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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
    public ResponseEntity answerQuestionnaire(@RequestBody Question answeredQuestion, @CookieValue(name = SESSION_ID_COOKIE_NAME, required = true) String sessionId) {
        questionnaireService.answer(answeredQuestion, sessionId);
        Optional<Question> nextQuestion = questionnaireService.getNext(sessionId);
        if (nextQuestion.isPresent()) {
            return ResponseEntity.ok(nextQuestion);
        }
        return ResponseEntity.ok(questionnaireService.getRecommendations(sessionId));
    }
}
