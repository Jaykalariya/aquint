package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.TrainingDetails;
import com.beit.aquint.user.service.TrainingDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/trainingDetails")
public class TrainingDetailsController {

    @Autowired
    TrainingDetailsService trainingDetailsService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getTrainingDetails(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting training details detail Based On User");
            return ResponseEntity.ok().body(trainingDetailsService.getTrainingDetails(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addTrainingDetails(@RequestBody TrainingDetails trainingDetails) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(trainingDetailsService.addTrainingDetails(trainingDetails));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{userId}")
    public ResponseEntity<?> updateTrainingDetails(@PathVariable(value = "userId") Long userId, @RequestBody TrainingDetails trainingDetails) {
        try {
            return ResponseEntity.ok().body(trainingDetailsService.updateTrainingDetails(userId,trainingDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.UPLOAD_FILE + "/{userId}")
    public ResponseEntity<?> uploadTrainingDetailsFile(@RequestPart("file") MultipartFile file, @PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(trainingDetailsService.uploadDocument(file, userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
