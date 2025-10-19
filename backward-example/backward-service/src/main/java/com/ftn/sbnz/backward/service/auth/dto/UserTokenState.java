package com.ftn.sbnz.backward.service.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO koji enkapsulira generisani JWT i njegovo trajanje koji se vracaju klijentu
@Data
@NoArgsConstructor
public class UserTokenState {
	
    private String accessToken;
    private Long expiresIn;
    private Boolean passwordChangeRequired;

    public UserTokenState(String accessToken, long expiresIn, boolean passwordChangeRequired) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.passwordChangeRequired = passwordChangeRequired;
    }
}