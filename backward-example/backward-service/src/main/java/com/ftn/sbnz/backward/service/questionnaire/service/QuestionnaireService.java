package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.model.models.Question;
import com.ftn.sbnz.backward.model.models.Recommendation;
import com.ftn.sbnz.backward.model.models.Watch;
import com.ftn.sbnz.backward.service.repository.IQuestionRepository;
import com.ftn.sbnz.backward.service.repository.IWatchRepository;
import com.ftn.sbnz.backward.service.sessionManagement.SessionRegistry;
import com.ftn.sbnz.backward.service.sessionManagement.SessionWrapper;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.FactHandle;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class QuestionnaireService {

    private final SessionRegistry sessionRegistry;

    private final IQuestionRepository questionRepository;

    private final IWatchRepository watchRepository;

    public QuestionnaireService(SessionRegistry sessionRegistry, IQuestionRepository questionRepository, IWatchRepository watchRepository) {
        this.sessionRegistry = sessionRegistry;
        this.questionRepository = questionRepository;
        this.watchRepository = watchRepository;
    }

    public String startQuestionnaire() {
        // Return sessionId
        SessionWrapper sessionWrapper = this.sessionRegistry.createSession();
        for (Recommendation r: getAllWatches()) {
            sessionWrapper.getKieSession().insert(r);
        }
        return sessionWrapper.getSessionId();
    }

    private SessionWrapper getSession(String sessionId) {
        SessionWrapper sessionWrapper = this.sessionRegistry.getSession(sessionId);
        sessionWrapper.getKieSession().setGlobal("questionRepository", new KjarRepositoryWrapper(this.questionRepository));
        return sessionWrapper;
    }

    public Optional<Question> getNext(String sessionId) {
        SessionWrapper sessionWrapper = this.getSession(sessionId);
        sessionWrapper.getKieSession().fireAllRules();
        QueryResults results = sessionWrapper.getKieSession().getQueryResults("nextQuestion");
        if (results.size() == 0) {
            return Optional.empty();
        }
        QueryResultsRow row = results.iterator().next();
        Question nextQuestion = (Question) row.get("$question");

        return Optional.of(nextQuestion);
    }

    public void answer(Question question, String sessionId) {
        SessionWrapper sessionWrapper = this.getSession(sessionId);
        KieSession kieSession = sessionWrapper.getKieSession();
        QueryResults results = kieSession.getQueryResults("findQuestionById", question.getId());
        if (results.size() == 0) {
            throw new IllegalArgumentException("Answered question not in kie session");
        }


        QueryResultsRow row = results.iterator().next();
        Question answeredQuestion = (Question) row.get("$question");
        answeredQuestion.setAnswer(question.getAnswer().orElseThrow(() -> new IllegalArgumentException("Answer not found")));
        FactHandle fh = kieSession.getFactHandle(answeredQuestion);

        kieSession.update(fh, question);
    }

    public List<Recommendation> getRecommendations(String sessionId) {
        SessionWrapper sessionWrapper = this.getSession(sessionId);
        QueryResults results = sessionWrapper.getKieSession().getQueryResults("recommendations");

        List<Recommendation> recommendations = new ArrayList<>();
        for (QueryResultsRow row : results) {
            recommendations.add((Recommendation) row.get("$recommendation"));
        }

        recommendations.sort(Comparator.comparing(Recommendation::getScore).reversed());
        return recommendations;
    }

    private List<Recommendation> getAllWatches() {
        return watchRepository.findAll().stream().map(watch -> new Recommendation(null, 0.0, watch)).collect(Collectors.toList());
    }

}
