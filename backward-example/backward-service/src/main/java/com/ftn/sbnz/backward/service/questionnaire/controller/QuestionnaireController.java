package com.ftn.sbnz.backward.service.questionnaire.controller;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.service.questionnaire.service.QuestionnaireService;
import com.ftn.sbnz.backward.service.sessionManagement.SessionWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller("/questionnaire")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @PostMapping("/start")
    public ResponseEntity<Question> startQuestionnaire(HttpServletResponse response) {
        String sessionId = questionnaireService.startQuestionnaire();
        response.addCookie(new Cookie("KIESESSIONID", sessionId));
        return ResponseEntity.ok(questionnaireService.getNext(sessionId));
    }

    @PostMapping("/answer")
    public void answerQuestionnaire(Question question, String sessionId) {}
}
