package com.ftn.sbnz.backward.service.auth.controller;

import java.security.Principal;
import java.util.Optional;

import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.model.models.UserRole;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.ftn.sbnz.backward.service.auth.dto.PasswordChangeRequest;
import com.ftn.sbnz.backward.service.auth.dto.UserDto;
import com.ftn.sbnz.backward.service.auth.dto.UserRequest;
import com.ftn.sbnz.backward.service.auth.service.IUserService;


// Primer kontrolera cijim metodama mogu pristupiti samo autorizovani korisnici
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	@Autowired
	private IUserService userService;

	// Za pristup ovoj metodi neophodno je da ulogovani korisnik ima ADMIN ulogu
	// Ukoliko nema, server ce vratiti gresku 403 Forbidden
	// Korisnik jeste autentifikovan, ali nije autorizovan da pristupi resursu
	@GetMapping("/user/{userId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public User loadById(@PathVariable Long userId) {
		return this.userService.findById(userId);
	}

	@GetMapping("/user/all")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Page<UserDto>> loadAll(
			@RequestParam(value = "role", required = false) String role,
			@RequestParam(value = "query", required = false) String query,
			@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable
			) {
		try {
			UserRole roleToFind = role != null ? UserRole.fromString(role) : null;
			return ResponseEntity.ok(this.userService.findAll(roleToFind, query, pageable).map(UserDto::new));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().body(Page.empty(pageable));
		}
	}

	@GetMapping("/whoami")
	public User user(Principal user) {
		Optional<User> userOptional = this.userService.findByUsername(user.getName());
		if (userOptional.isPresent()) {
			return userOptional.get();
		} else {
			throw new UsernameNotFoundException("User not found");
		}
	}

	@PostMapping("/user/change-password")
	public ResponseEntity changePassword(@Valid @RequestBody PasswordChangeRequest passwordChangeRequest) {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		this.userService.changePassword(user, passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());
		return ResponseEntity.ok(null);
	}

	@PostMapping("/users")
	@PreAuthorize("hasAuthority('SUPER_ADMIN')")
	public UserDto addUser(@RequestBody UserRequest user) {
		// TODO: Currently only adds admins, should be expanded to include other roles
		return new UserDto(this.userService.save(user, UserRole.ADMIN));

	}
}
