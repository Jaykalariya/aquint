package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.QualificationDetails;
import com.beit.aquint.user.entity.WorkExperience;
import com.beit.aquint.user.service.QualificationDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "**")
@RestController
@RequestMapping("/_v1/user/qualification")
@Slf4j
public class QualificationDetailsController {

    @Autowired
    private QualificationDetailsService qualificationDetailsService;

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<List<QualificationDetails>> getAllQualificationDetails() {
        try {
            List<QualificationDetails> allQualificationDetails = qualificationDetailsService.getAllUserQualificationDetails();
            return ResponseEntity.ok().body(allQualificationDetails);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getuserQualificationDetail(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(qualificationDetailsService.getUserQualificationDetail(userId));
        }catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addQualificationDetails(@RequestBody QualificationDetails qualificationDetails) {
        try {
            QualificationDetails addedQualificationDetails = qualificationDetailsService.addQualificationDetails(qualificationDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedQualificationDetails);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE + "/{userId}")
    public ResponseEntity<?> updateQualificationDetails(
            @PathVariable(value = "userId") Long userId,
            @RequestBody QualificationDetails updatedQualificationDetails) {
        try {
            QualificationDetails result = qualificationDetailsService.updateQualificationDetails(userId, updatedQualificationDetails);
            return ResponseEntity.ok().body(result);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Failed to update work experience",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


    @PostMapping(value = Constant.Mappping.UPLOAD_FILE)
    public ResponseEntity<?> uploadQUALIFICATIONDocument(@RequestPart("file") MultipartFile file) {
        try {
            return ResponseEntity.ok().body(qualificationDetailsService.uploadQualificationDocument(file));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    // Add other endpoints if needed
}
