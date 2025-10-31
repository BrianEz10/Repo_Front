package com.foodstore.service;

import com.foodstore.dto.RegisterRequest;
import com.foodstore.dto.UserResponse;
import com.foodstore.entity.User;
import com.foodstore.repository.UserRepository;
import com.foodstore.util.Sha256Util;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = User.builder()
                .name(req.name())
                .email(req.email())
                .password(Sha256Util.hash(req.password()))
                .role("client")
                .build();

        User saved = userRepository.save(user);
        return new UserResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    public UserResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        String hashed = Sha256Util.hash(password);
        if (!user.getPassword().equals(hashed)) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
