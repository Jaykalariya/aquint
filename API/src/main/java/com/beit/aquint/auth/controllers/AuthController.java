package com.beit.aquint.auth.controllers;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.auth.models.User;
import com.beit.aquint.auth.payload.request.LoginRequest;
import com.beit.aquint.auth.payload.request.SignupRequest;
import com.beit.aquint.auth.payload.response.JwtResponse;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.dto.reponse.SignupResponse;
import com.beit.aquint.auth.repository.RoleRepository;
import com.beit.aquint.auth.repository.UserRepository;
import com.beit.aquint.auth.security.PasswordGenerator;
import com.beit.aquint.auth.security.jwt.JwtUtils;
import com.beit.aquint.auth.security.services.UserDetailsImpl;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.repository.UserDetailRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "**")
@RestController
@RequestMapping("/_v1/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordGenerator passwordGenerator;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
try {
    Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    if(checkStatus(loginRequest.getUsername())) {
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }
    else{
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("User status is Inactive, Please Contact Admin");
    }
}
catch(Exception exception){
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Can not process");
}
}

    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Generate password
        String generatedPassword = "12345678";

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), encoder.encode(generatedPassword));

        Set<Integer> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            Role adminRole = roleRepository.findById(role.longValue()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
        });

        //save
        user.setRoles(roles);
        userRepository.save(user);
        Optional<User> userDetails = userRepository.findByUsername(user.getUsername());

        UserDetail userDetail = new UserDetail(userDetails.get().getId() ,signUpRequest.getEmail(), signUpRequest.getFirstname(), signUpRequest.getMiddlename(), signUpRequest.getLastname());

        try {
            userDetailRepository.save(userDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Error: Unable to save user details."));
        }
        //signupResponse

        return ResponseEntity
                .ok(new SignupResponse("User registered successfully!", userDetails.get().getUsername(), userDetails.get().getEmail(), generatedPassword));
    }

    private boolean checkStatus(String username){
        return userRepository.findByUsername(username).get().getStatus().equals(Constant.Status.ACTIVE);
    }
}


