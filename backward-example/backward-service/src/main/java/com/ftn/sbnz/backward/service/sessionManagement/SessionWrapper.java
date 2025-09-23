package com.ftn.sbnz.backward.service.sessionManagement;

import lombok.Getter;
import org.kie.api.runtime.KieSession;
import java.time.Instant;

@Getter
public class SessionWrapper {
    private final String sessionId;
    private final KieSession kieSession;
    private volatile Instant lastAccessed;

    public SessionWrapper(KieSession kieSession, String sessionId) {
        this.kieSession = kieSession;
        this.lastAccessed = Instant.now();
        this.sessionId = sessionId;
    }

    public KieSession getKieSession() {
        this.lastAccessed = Instant.now();
        return kieSession;
    }

    public void dispose() {
        kieSession.dispose();
    }
}
