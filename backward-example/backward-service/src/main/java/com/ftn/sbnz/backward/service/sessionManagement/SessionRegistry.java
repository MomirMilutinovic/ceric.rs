package com.ftn.sbnz.backward.service.sessionManagement;

import com.ftn.sbnz.backward.kjar.BackwardKjarApplication;
import com.ftn.sbnz.backward.model.models.FamousBrandsForBudget;
import com.ftn.sbnz.backward.service.repository.IFamousBrandsForBudgetRepository;
import org.drools.core.impl.InternalKnowledgeBase;
import org.drools.core.impl.KnowledgeBaseFactory;
import org.drools.template.ObjectDataCompiler;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.internal.builder.KnowledgeBuilder;
import org.kie.internal.builder.KnowledgeBuilderError;
import org.kie.internal.builder.KnowledgeBuilderFactory;
import org.kie.internal.io.ResourceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class SessionRegistry {

    private final Map<String, SessionWrapper> sessions = new ConcurrentHashMap<>();
    private final KieContainer kieContainer;
    private final IIconicWatchQuestionRepository iconicWatchQuestionRepository;
    private final IFamousBrandsForBudgetRepository famousBrandsForBudgetRepository;

    @Autowired
    public SessionRegistry(KieContainer kieContainer, IIconicWatchQuestionRepository iconicWatchQuestionRepository, IFamousBrandsForBudgetRepository famousBrandsForBudgetRepository) {
        this.kieContainer = kieContainer;
        this.iconicWatchQuestionRepository = iconicWatchQuestionRepository;
        this.famousBrandsForBudgetRepository = famousBrandsForBudgetRepository;
    }

    public SessionWrapper createQuestionnaireSession() {
        InternalKnowledgeBase kieBase = getKnowledgeBase("/rules/backward-example.drl", true);
        KieSession kieSession = kieBase.newKieSession();
        String sessionId = UUID.randomUUID().toString();
        SessionWrapper sessionWrapper = new SessionWrapper(kieSession, sessionId);
        sessions.put(sessionId, sessionWrapper);
        return sessionWrapper;
    }

    public SessionWrapper createCEPSession() {
        InternalKnowledgeBase kieBase = getKnowledgeBase("/rules/trending-watch-cep.drl", false);
        KieSession kieSession = kieBase.newKieSession();
        String sessionId = UUID.randomUUID().toString();
        SessionWrapper sessionWrapper = new SessionWrapper(kieSession, sessionId);
        sessionWrapper.setDontClean(true);
        sessions.put(sessionId, sessionWrapper);
        return sessionWrapper;
    }

    private InternalKnowledgeBase getKnowledgeBase(String drlPath, boolean shouldExpandTemplates) {
        KnowledgeBuilder kBuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
        loadDRL(kBuilder, drlPath);
        if (shouldExpandTemplates) {
            expandTemplates(kBuilder);
        }
        InternalKnowledgeBase kieBase = KnowledgeBaseFactory.newKnowledgeBase();
        kieBase.addPackages(kBuilder.getKnowledgePackages());
        return kieBase;
    }

    private void loadDRL(KnowledgeBuilder kBuilder, String drlPath) {
        InputStream rulesInputStream = BackwardKjarApplication.class.getResourceAsStream(drlPath);
        kBuilder.add(ResourceFactory.newInputStreamResource(rulesInputStream), ResourceType.DRL);
        if( kBuilder.hasErrors() ){
            for(KnowledgeBuilderError err: kBuilder.getErrors()){
                System.err.println(err.toString());
                System.err.println(err.getMessage());
            }
            throw new IllegalStateException( "DRL errors" );
        }
    }

    private void expandTemplates(KnowledgeBuilder kBuilder) {
        List<IconicWatchQuestionDto> iconicWatchQuestionDtos = iconicWatchQuestionRepository.getIconicWatchQuestionDtos();
        List<FamousBrandsForBudget> famousBrandsForBudgets = famousBrandsForBudgetRepository.findAll();
        expandTemplate(kBuilder, iconicWatchQuestionDtos, "/templates/iconic-watch-template.drt");
        expandTemplate(kBuilder, famousBrandsForBudgets, "/templates/famous-brand-template.drt");
    }

    private void expandTemplate(KnowledgeBuilder knowledgeBuilder, Collection<?> entries, String pathToTemplate) {
        ObjectDataCompiler converter = new ObjectDataCompiler();
        InputStream templateInputStream = BackwardKjarApplication.class.getResourceAsStream(pathToTemplate);
        if (templateInputStream == null) {
            throw new IllegalStateException( "Template " + pathToTemplate + " not found" );
        }
        String drl = converter.compile(entries, templateInputStream);
        Reader rdr = new StringReader(drl);
        knowledgeBuilder.add(ResourceFactory.newReaderResource(rdr), ResourceType.DRL);
        if(knowledgeBuilder.hasErrors()){
            for(KnowledgeBuilderError err: knowledgeBuilder.getErrors()){
                System.err.println(err.toString());
                System.err.println(Arrays.toString(err.getLines()));
                System.err.println(err.getMessage());
            }
            throw new IllegalStateException( "DRL errors" );
        }
    }

    public SessionWrapper getSession(String sessionId) {
        return sessions.get(sessionId);
    }

    public void removeSession(String sessionId) {
        SessionWrapper wrapper = sessions.remove(sessionId);
        if (wrapper != null) {
            wrapper.dispose();
        }
    }

    public Map<String, SessionWrapper> getIdleSessions(long idleThresholdSeconds) {
        Instant threshold = Instant.now().minusSeconds(idleThresholdSeconds);
        return sessions.entrySet().stream()
                .filter(entry -> entry.getValue().getLastAccessed().isBefore(threshold) && !entry.getValue().isDontClean())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public int size() {
        return sessions.size();
    }

}
