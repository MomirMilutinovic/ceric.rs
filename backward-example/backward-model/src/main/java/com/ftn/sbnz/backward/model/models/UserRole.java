package com.ftn.sbnz.backward.model.models;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    CUSTOMER("CUSTOMER"),
    CLERK("CLERK"),
    ADMIN("ADMIN"),
    SUPER_ADMIN("SUPER_ADMIN");

    private String name;

    UserRole(String name) {
        this.name = name;
    }

    public static UserRole fromString(String value) {
        switch (value) {
            case "CUSTOMER":
                return UserRole.CUSTOMER;
            case "CLERK":
                return UserRole.CLERK;
            case "ADMIN":
                return UserRole.ADMIN;
            case "SUPER_ADMIN":
                return UserRole.SUPER_ADMIN;
        }
        throw new IllegalArgumentException("Invalid string in account role");
    }

    @Override
    public String toString() {
        return this.name;
    }

    @Override
    public String getAuthority() {
        return name;
    }
}
