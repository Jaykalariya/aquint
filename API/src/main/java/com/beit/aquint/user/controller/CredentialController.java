package com.beit.aquint.user.controller;

import com.beit.aquint.auth.repository.UserRepository;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.project.projectprocess.service.ProjectProcessService;
import com.beit.aquint.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "**")
@RestController
@RequestMapping("/existedCredential")
public class CredentialController {
    @Autowired
    UserService userService;

    @Autowired
    ProjectProcessService projectProcessService;

    @PostMapping(Constant.Mappping.EMAIL + "/{email}")
    public ResponseEntity<Boolean> emailExist(@PathVariable(value = "email") String email) {
        return ResponseEntity.ok( userService.existsByEmail(email));
    }

    @PostMapping(Constant.Mappping.PROJECT_CUSTOM_ID + "/{projectCustomId}")
    public ResponseEntity<Boolean> projectCustomIdExist(@PathVariable(value = "projectCustomId") String projectCustomId) {
        return ResponseEntity.ok( projectProcessService.existsByProjectCustomId(projectCustomId));
    }

    @PostMapping(Constant.Mappping.USERNAME + "/{username}")
    public ResponseEntity<Boolean> usernameExist(@PathVariable(value = "username") String username) {
        return ResponseEntity.ok( userService.existsByUsername(username));
    }
}
