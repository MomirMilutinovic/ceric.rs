package com.ftn.sbnz.backward.service.auth.dto;

import com.ftn.sbnz.backward.model.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean enabled;
    private String role;
    private String profileImageUrl;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.enabled = user.isEnabled();
        this.role = user.getRole().toString();
        // TODO: Change profile image url to be taken from user once images are implemented
        this.profileImageUrl = user.getProfileImageUrl();
    }
}
