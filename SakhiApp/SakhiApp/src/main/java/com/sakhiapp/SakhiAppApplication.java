package com.sakhiapp;

import com.sakhiapp.entity.Role;
import com.sakhiapp.entity.User;
import com.sakhiapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class SakhiAppApplication {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SakhiAppApplication.class, args);
		System.out.println("RUN__ SUCCESSFULLY>>>>");
	}

	@Bean
    CommandLineRunner createAdmin() {

		return args -> {

			String adminUsername = "admin";
			String adminPassword = "Admin@123";

			// Check if admin already exists
			if (userRepository.findByUsername(adminUsername).isEmpty()) {

				User admin = new User();

				admin.setUsername(adminUsername);

				// Store BCrypt encrypted password
				admin.setPassword(
						passwordEncoder.encode(adminPassword)
				);

				// Give ADMIN role
				admin.setRole(Role.ADMIN);

				userRepository.save(admin);

				System.out.println(
						"======================================"
				);
				System.out.println(
						"DEFAULT ADMIN CREATED"
				);
				System.out.println(
						"Username : " + adminUsername
				);
				System.out.println(
						"Password : " + adminPassword
				);
				System.out.println(
						"======================================"
				);

			} else {

				System.out.println(
						"Admin already exists. Skipping creation."
				);
			}
		};
	}
}
