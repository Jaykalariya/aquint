package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.PersonalAccountDetails;
import com.beit.aquint.user.service.PersonalAccountDetailsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/personalAccountDetails")
public class PersonalAccountDetailsController {

    @Autowired
    PersonalAccountDetailsService personalAccountDetailsService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getPersonalAccountDetails(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting personal account detail Based On User");
            return ResponseEntity.ok().body(personalAccountDetailsService.getPersonalAccountDetails(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addPersonalAccountDetails(@RequestBody @Valid PersonalAccountDetails personalAccountDetails) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(personalAccountDetailsService.addPersonalAccountDetails(personalAccountDetails));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable(value = "userId") Long userId, @RequestBody @Valid PersonalAccountDetails personalAccountDetails) {
        try {
            return ResponseEntity.ok().body(personalAccountDetailsService.updatePersonalAccountDetails(userId,personalAccountDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.UPLOAD_FILE + "/{userId}")
    public ResponseEntity<?> uploadTenderFile(@RequestPart("file") MultipartFile file,@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(personalAccountDetailsService.uploadDocument(file, userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

//    @PostMapping(value = Constant.Mappping.ADD_PERSONAL_ACCOUNT_DETAILS)
//    public ResponseEntity<?> addPersonalAccountDetails(@RequestPart("aadhaar") MultipartFile aadhaar,
//                                                       @RequestPart("pan") MultipartFile pan,
//                                                       @RequestPart("drivingLicence") MultipartFile drivingLicence,
//                                                       @RequestPart("accountStatement") MultipartFile accountStatement,
//                                                       @RequestPart("personalAccountDetails") PersonalAccountDetailsDto personalAccountDetailsDto) {
//        try {
//            log.debug("Adding Details");
//            return ResponseEntity.ok().body(personalAccountDetailsService.addPersonalAccountDetails(aadhaar,pan,drivingLicence,accountStatement,personalAccountDetailsDto));
//        } catch (Exception exception) {
//            log.error(exception.getMessage());
//            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
//        }
//}



}
