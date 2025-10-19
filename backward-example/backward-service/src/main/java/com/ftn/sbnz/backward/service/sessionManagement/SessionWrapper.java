package com.ftn.sbnz.backward.service.sessionManagement;

import lombok.Getter;
import lombok.Setter;
import org.kie.api.runtime.KieSession;
import java.time.Instant;

@Getter
public class SessionWrapper {
    private final String sessionId;
    private final KieSession kieSession;
    private volatile Instant lastAccessed;
    @Setter
    private boolean dontClean;

    public SessionWrapper(KieSession kieSession, String sessionId) {
        this.kieSession = kieSession;
        this.lastAccessed = Instant.now();
        this.sessionId = sessionId;
        this.dontClean = false;
    }

    public KieSession getKieSession() {
        this.lastAccessed = Instant.now();
        return kieSession;
    }

    public void dispose() {
        kieSession.dispose();
    }

}
