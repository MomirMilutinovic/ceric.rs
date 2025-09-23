package com.ftn.sbnz.backward.service.sessionManagement;

import com.ftn.sbnz.backward.kjar.BackwardKjarApplication;
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
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class SessionRegistry {

    private final Map<String, SessionWrapper> sessions = new ConcurrentHashMap<>();
    private final KieContainer kieContainer;
    private IIconicWatchQuestionRepository iconicWatchQuestionRepository;

    @Autowired
    public SessionRegistry(KieContainer kieContainer, IIconicWatchQuestionRepository iconicWatchQuestionRepository) {
        this.kieContainer = kieContainer;
        this.iconicWatchQuestionRepository = iconicWatchQuestionRepository;
    }

    public SessionWrapper createSession() {
        InternalKnowledgeBase kieBase = getKnowledgeBase();
        KieSession kieSession = kieBase.newKieSession();
        String sessionId = UUID.randomUUID().toString();
        SessionWrapper sessionWrapper = new SessionWrapper(kieSession, sessionId);
        sessions.put(sessionId, sessionWrapper);
        return sessionWrapper;
    }

    private InternalKnowledgeBase getKnowledgeBase() {
        KnowledgeBuilder kBuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
        loadDRL(kBuilder);
        expandTemplates(kBuilder);
        InternalKnowledgeBase kieBase = KnowledgeBaseFactory.newKnowledgeBase();
        kieBase.addPackages(kBuilder.getKnowledgePackages());
        return kieBase;
    }

    private void loadDRL(KnowledgeBuilder kBuilder) {
        InputStream rulesInputStream = BackwardKjarApplication.class.getResourceAsStream("/rules/backward-example.drl");
        kBuilder.add(ResourceFactory.newInputStreamResource(rulesInputStream), ResourceType.DRL);
        if( kBuilder.hasErrors() ){
            for(KnowledgeBuilderError err: kBuilder.getErrors()){
                System.err.println(err.toString());
            }
            throw new IllegalStateException( "DRL errors" );
        }
    }

    private void expandTemplates(KnowledgeBuilder kBuilder) {
        List<IconicWatchQuestionDto> iconicWatchQuestionDtos = iconicWatchQuestionRepository.getIconicWatchQuestionDtos();
        ObjectDataCompiler converter = new ObjectDataCompiler();
        InputStream templateInputStream = BackwardKjarApplication.class.getResourceAsStream("/templates/iconic-watch-template.drt");
        if (templateInputStream == null) {
            throw new IllegalStateException( "Iconic watch question template not found" );
        }
        String drl = converter.compile(iconicWatchQuestionDtos, templateInputStream);
        Reader rdr = new StringReader(drl);
        kBuilder.add(ResourceFactory.newReaderResource(rdr), ResourceType.DRL);
        if( kBuilder.hasErrors() ){
            for(KnowledgeBuilderError err: kBuilder.getErrors()){
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
                .filter(entry -> entry.getValue().getLastAccessed().isBefore(threshold))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public int size() {
        return sessions.size();
    }
}
