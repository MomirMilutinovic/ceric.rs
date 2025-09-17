package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.model.models.Recommendation;
import com.ftn.sbnz.backward.service.sessionManagement.SessionRegistry;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionnaireService {

    private final SessionRegistry sessionRegistry;

    public QuestionnaireService(SessionRegistry sessionRegistry) {
        this.sessionRegistry = sessionRegistry;
    }

    public String startQuestionnaire() {
        // Return sessionId
        return null;
    }

    public Question getNext(String sessionId) {
        return null;
    }

    public void answer(Question question, String sessionId) {}

    public List<Recommendation> getRecommendations(String sessionId) {
        return null;
    }

}
