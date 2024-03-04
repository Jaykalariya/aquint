package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.request.SignupRequest;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.WorkExperience;
import com.beit.aquint.user.service.WorkExperienceService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@CrossOrigin(origins = "**")
@RestController
@RequestMapping("/_v1/user/workExperience")
@Slf4j
public class WorkExperienceController {

    @Autowired
    WorkExperienceService workExperienceService;

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<List<WorkExperience>> getAllWorkExperience() {
        try {
            List<WorkExperience> allWorkExperience = workExperienceService.getAllUserExperienceDetails();
            return ResponseEntity.ok().body(allWorkExperience);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getuserWorkExperienceDetail(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(workExperienceService.getUserWorkExperienceDetail(userId));
        }catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addExperience(@Valid @RequestBody WorkExperience workExperience) {
        try {

            return ResponseEntity.ok().body(workExperienceService.addWorkExperience(workExperience));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    @PutMapping(value = Constant.Mappping.UPDATE + "/{workExperienceId}")
    public ResponseEntity<?> updateExperienceDetail(@PathVariable(value = "workExperienceId") Long workExperienceId, @RequestBody WorkExperience workExperience){
        try{
            return ResponseEntity.ok().body(workExperienceService.updateWorkExperience(workExperienceId,workExperience));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Failed to update work experience",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.UPLOAD_FILE + "/{userId}")
    public ResponseEntity<?> uploadSupportingDocument(@RequestPart("file") MultipartFile file, @PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(workExperienceService.uploadDocument(file, userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
