package com.spkorea.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spkorea.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, PasswordEncoder passwordEncoder2) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder2;
    	
    }

}