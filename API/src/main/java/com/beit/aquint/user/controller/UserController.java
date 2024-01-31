package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.request.SignupRequest;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 09/10/23  9:28 pm
 */
@CrossOrigin(origins = "**", maxAge = 3600)
@RestController
@RequestMapping("/_v1/user")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = Constant.Mappping.ADD_USER)
    public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }

            if (userService.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
            }
            return ResponseEntity.ok().body(userService.addUser(signupRequest));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE_USER  + "/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable(value = "userId") Long userId, @RequestBody UserDetail userDetail) {
        try {
            return ResponseEntity.ok().body(userService.updateUserProfileBasicDetails(userId,userDetail));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping(value = Constant.Mappping.ALL_USER_DETAILS)
    public ResponseEntity<?> getAllUserFullDetails() {
        try {
            return ResponseEntity.ok().body(userService.getAllUserFullDetail());
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "No Data",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping(value = Constant.Mappping.ALL_USER_DETAILS + "/{userId}")
    public ResponseEntity<?> getUserFullDetails(@PathVariable(value = "userId") Long userId) {
        try {
            return ResponseEntity.ok().body(userService.getUserFullDetail(userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "No Data",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.USER_GET_ALL_WITH_PAGINATION)
    public ResponseEntity<?> getUserPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Users");
            return ResponseEntity.ok().body(userService.getUserPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Getting Users Has Some Issue"));
        }
    }



    @PostMapping("/details/add")
    public ResponseEntity<?> addUserDetails(@RequestBody UserDetail userDetail) {
        try {
            return ResponseEntity.ok().body(userService.addUserProfileBasicDetails(userDetail));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_USER_BASIC_DETAILS + "/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable(value = "userId") Long userId) {
        try {
            return ResponseEntity.ok().body(userService.getUserDetail(userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/upload/profilePhoto")
    public ResponseEntity<?> uploadProfilePhoto(@RequestPart("file") MultipartFile file) {
        try {
            return ResponseEntity.ok().body(userService.uploadProfilePhoto(file));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
