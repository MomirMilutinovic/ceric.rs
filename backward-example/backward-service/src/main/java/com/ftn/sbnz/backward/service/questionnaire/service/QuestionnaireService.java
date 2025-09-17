package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.model.models.Recommendation;
import com.ftn.sbnz.backward.service.repository.IQuestionRepository;
import com.ftn.sbnz.backward.service.sessionManagement.SessionRegistry;
import com.ftn.sbnz.backward.service.sessionManagement.SessionWrapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionnaireService {

    private final SessionRegistry sessionRegistry;

    private final IQuestionRepository questionRepository;

    public QuestionnaireService(SessionRegistry sessionRegistry, IQuestionRepository questionRepository) {
        this.sessionRegistry = sessionRegistry;
        this.questionRepository = questionRepository;
    }

    public String startQuestionnaire() {
        // Return sessionId
        SessionWrapper sessionWrapper = this.sessionRegistry.createSession();
        return sessionWrapper.getSessionId();
    }

    public Question getNext(String sessionId) {
        SessionWrapper sessionWrapper = this.sessionRegistry.getSession(sessionId);
        sessionWrapper.getKieSession().setGlobal("questionRepository", new KjarRepositoryWrapper(this.questionRepository));
        sessionWrapper.getKieSession().setGlobal("nextQuestion", null);
        sessionWrapper.getKieSession().fireAllRules();
        return (Question) sessionWrapper.getKieSession().getGlobal("nextQuestion");
    }

    public void answer(Question question, String sessionId) {}

    public List<Recommendation> getRecommendations(String sessionId) {
        return null;
    }

}
