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
        sessionWrapper.getKieSession().setGlobal("watchSpecifications", new ArrayList<Specification<Watch>>());
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
        Question nextQuestion = (Question)(sessionWrapper.getKieSession().getGlobal("nextQuestion"));

        // If there are no more questions the answered question will stay assigned to the nextQuestion drools global
        if (nextQuestion.isNotAnswered()) {
            return Optional.of(nextQuestion);
        }
        return Optional.empty();
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
        List<Specification<Watch>> watchSpecifications = (List<Specification<Watch>>) sessionWrapper.getKieSession().getGlobal("watchSpecifications");

        Specification<Watch> combinedSpecification = watchSpecifications.stream().reduce(Specification::and).orElse(null);
        List<Watch> watchesToRecommend = watchRepository.findAll(combinedSpecification);
        return watchesToRecommend.stream().map(watch -> new Recommendation(null, 0.0, watch)).collect(Collectors.toList());
    }

}
