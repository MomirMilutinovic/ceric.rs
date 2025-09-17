package com.ftn.sbnz.backward.service.sessionManagement;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class SessionRegistry {

    private final Map<String, SessionWrapper> sessions = new ConcurrentHashMap<>();
    private final KieContainer kieContainer;

    @Autowired
    public SessionRegistry(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public SessionWrapper createSession() {
        KieSession kieSession = kieContainer.newKieSession();
        String sessionId = UUID.randomUUID().toString();
        SessionWrapper sessionWrapper = new SessionWrapper(kieSession, sessionId);
        sessions.put(sessionId, sessionWrapper);
        return sessionWrapper;
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
