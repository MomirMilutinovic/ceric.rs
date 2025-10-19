package com.ftn.sbnz.backward.service.questionnaire.service;

import com.ftn.sbnz.backward.model.models.*;
import com.ftn.sbnz.backward.service.repository.IRecommendationEventRepository;
import com.ftn.sbnz.backward.service.repository.IRecommendationRepository;
import com.ftn.sbnz.backward.service.sessionManagement.IIconicWatchQuestionRepository;
import com.ftn.sbnz.backward.service.repository.IQuestionRepository;
import com.ftn.sbnz.backward.service.repository.IWatchRepository;
import com.ftn.sbnz.backward.service.sessionManagement.SessionRegistry;
import com.ftn.sbnz.backward.service.sessionManagement.SessionWrapper;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.FactHandle;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class QuestionnaireService {

    private final SessionRegistry sessionRegistry;

    private final IQuestionRepository questionRepository;

    private final IIconicWatchQuestionRepository iconicWatchQuestionRepository;

    private final IWatchRepository watchRepository;

    private final SessionWrapper cepSessionWrapper;

    private final IRecommendationEventRepository recommendationEventRepository;

    private final IRecommendationRepository recommendationRepository;

    public QuestionnaireService(SessionRegistry sessionRegistry, IQuestionRepository questionRepository, IWatchRepository watchRepository, IIconicWatchQuestionRepository iconicWatchQuestionRepository, IRecommendationEventRepository recommendationEventRepository, IRecommendationRepository recommendationRepository) {
        this.sessionRegistry = sessionRegistry;
        this.questionRepository = questionRepository;
        this.watchRepository = watchRepository;
        this.iconicWatchQuestionRepository = iconicWatchQuestionRepository;
        this.cepSessionWrapper = this.sessionRegistry.createCEPSession();
        this.recommendationEventRepository = recommendationEventRepository;
        this.recommendationRepository = recommendationRepository;

        for (RecommendationEvent event : recommendationEventRepository.findAll()) {
            this.cepSessionWrapper.getKieSession().insert(event);
        }
    }

    public String startQuestionnaire() {
        // Return sessionId
        QueryResults watchResults = this.cepSessionWrapper.getKieSession().getQueryResults("watches");
        if (watchResults.size() == 0) {
            for (Watch w: watchRepository.findAll()) {
                this.cepSessionWrapper.getKieSession().insert(w);
            }
        }
        SessionWrapper sessionWrapper = this.sessionRegistry.createQuestionnaireSession();
        for (Recommendation r: getAllWatches()) {
            sessionWrapper.getKieSession().insert(r);
        }
        for (IconicWatchQuestion iconicWatchQuestion: iconicWatchQuestionRepository.findAll()) {
            sessionWrapper.getKieSession().insert(iconicWatchQuestion);
        }
        return sessionWrapper.getSessionId();
    }

    private SessionWrapper getSession(String sessionId) {
        SessionWrapper sessionWrapper = this.sessionRegistry.getSession(sessionId);
        sessionWrapper.getKieSession().setGlobal("questionRepository", new KjarRepositoryWrapper(this.questionRepository));
        sessionWrapper.getKieSession().setGlobal("trendingWatches", getTrendingWatches());
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

    public List<Watch> getTrendingWatches() {
        List<Watch> trendingWatches = new ArrayList<>();
        QueryResults results = this.cepSessionWrapper.getKieSession().getQueryResults("trendingWatches");
        for (QueryResultsRow row : results) {
            trendingWatches.add((Watch) row.get("$watch"));
        }
        return trendingWatches;
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

    public List<Recommendation> getRecommendations(String sessionId, User user) {
        SessionWrapper sessionWrapper = this.getSession(sessionId);

        QueryResults results = sessionWrapper.getKieSession().getQueryResults("recommendations");
        List<Recommendation> recommendations = new ArrayList<>();
        for (QueryResultsRow row : results) {
            recommendations.add((Recommendation) row.get("$recommendation"));
        }

        RecommendationEvent recommendationEvent = new RecommendationEvent();
        recommendationEvent.setTimestamp(new Date());
        recommendationEvent.setUser(user);
        List<Recommendation> savedRecommendations = recommendationRepository.saveAll(recommendations);
        recommendationEvent.setRecommendations(savedRecommendations);
        recommendationEventRepository.save(recommendationEvent);

        cepSessionWrapper.getKieSession().insert(recommendationEvent);
        cepSessionWrapper.getKieSession().fireAllRules();

        recommendations.sort(Comparator.comparing(Recommendation::getScore).reversed());
        return recommendations;
    }

    private List<Recommendation> getAllWatches() {
        return watchRepository.findAll().stream().map(watch -> new Recommendation(null, 0.0, watch)).collect(Collectors.toList());
    }

}
