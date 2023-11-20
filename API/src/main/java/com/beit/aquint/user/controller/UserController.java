package com.beit.aquint.user.controller;

import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.service.UserService;
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
public class UserController {

    @Autowired
    UserService userService;

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
