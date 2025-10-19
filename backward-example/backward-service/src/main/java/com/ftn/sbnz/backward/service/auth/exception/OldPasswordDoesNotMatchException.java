package com.ftn.sbnz.backward.service.auth.exception;

public class OldPasswordDoesNotMatchException extends RuntimeException {
    private static final long serialVersionUID = 1791564636123821405L;

    public OldPasswordDoesNotMatchException(String message) {
        super(message);
    }
}
