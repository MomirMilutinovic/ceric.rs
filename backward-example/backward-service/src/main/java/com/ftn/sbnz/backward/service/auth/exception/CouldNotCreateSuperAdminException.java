package com.ftn.sbnz.backward.service.auth.exception;

public class CouldNotCreateSuperAdminException extends RuntimeException {
    private static final long serialVersionUID = 1791564636123821405L;

    public CouldNotCreateSuperAdminException(String message) {
        super(message);
    }
}
