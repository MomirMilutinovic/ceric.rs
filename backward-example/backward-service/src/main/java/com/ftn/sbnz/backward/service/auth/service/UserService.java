package com.ftn.sbnz.backward.service.auth.service;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.ftn.sbnz.backward.model.models.User;
import com.ftn.sbnz.backward.model.models.UserRole;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ftn.sbnz.backward.service.auth.dto.UserRequest;
import com.ftn.sbnz.backward.service.auth.exception.OldPasswordDoesNotMatchException;
import com.ftn.sbnz.backward.service.auth.repository.IUserRepository;
import com.ftn.sbnz.backward.service.auth.exception.CouldNotCreateSuperAdminException;


@Service
public class UserService implements IUserService {

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private final int superAdminPasswordLength = 20;
	private final String superAdminUsername = "superadmin";

	@Override
	public Optional<User> findByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username);
	}

	public User findById(Long id) throws AccessDeniedException {
		return userRepository.findById(id).orElseGet(null);
	}

	public List<User> findAll() throws AccessDeniedException {
		return userRepository.findAll();
	}

	@Override
	public User save(UserRequest userRequest, UserRole role) {
		// TODO: Create a method that will somehow take in whether verification is required
		return save(userRequest, role, false, false);
	}

	private User save(UserRequest userRequest, UserRole role, boolean passwordChangeRequired, boolean emailVerificationRequired) {
		User user = new User();
		user.setUsername(userRequest.getUsername());

		// pre nego sto postavimo lozinku u atribut hesiramo je kako bi se u bazi nalazila hesirana lozinka
		// treba voditi racuna da se koristi isi password encoder bean koji je postavljen u AUthenticationManager-u kako bi koristili isti algoritam
		user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setEnabled(true);
		user.setEmail(userRequest.getEmail());
		user.setPasswordChangeRequired(passwordChangeRequired);
		user.setProfileImageUrl(userRequest.getProfileImageUrl());
		user.setEmailVerified(!emailVerificationRequired);

		user.setRole(role);
		return this.userRepository.save(user);
	}

	private String generateRandomString(int length) {
		String characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
		Random rng = new Random();
		char[] text = new char[length];
		for (int i = 0; i < length; i++)
		{
			text[i] = characters.charAt(rng.nextInt(characters.length()));
		}
		return new String(text);
	}

	private void writeTextFile(String path, String text) throws FileNotFoundException {
		PrintWriter out = new PrintWriter(path);
		out.println(text);
		out.close();
	}

	public User changePassword(User user, String oldPassword, String newPassword) {
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new OldPasswordDoesNotMatchException("The old password must match your current password");
		}
		user.setPassword(passwordEncoder.encode(newPassword));
		return userRepository.saveAndFlush(user);
	}

	@Override
	public Page<User> findAll(UserRole role, String searchString, Pageable pageable) {
		if (role != null && searchString != null) {
			return userRepository.findAllByRoleAndString(role, searchString, pageable);
		} else if (role != null){
			return userRepository.findAllByRole(role, pageable);
		}
		if (searchString != null) {
			return userRepository.findAllByString(searchString, pageable);
		}
		return userRepository.findAll(pageable);
	}

	@Override
	@PostConstruct
	public void createSuperAdmin() {
		if (userRepository.findByRole(UserRole.SUPER_ADMIN).isPresent()) {
			return;
		}

		//String password = generateRandomString(superAdminPasswordLength);
		String password = "admin";
		// FIXME: Don't hardcode profile pic
		UserRequest superAdminRequest = new UserRequest(null, "admin", password, "super", "admin", null, "http://localhost:8787/images/placeholder.png");
		try {
			writeTextFile("superadmin_password.txt", password);
		} catch (FileNotFoundException e) {
			throw new CouldNotCreateSuperAdminException("Could not write super admin password to file");
		}

        save(superAdminRequest, UserRole.SUPER_ADMIN, false, false);
    }

}
