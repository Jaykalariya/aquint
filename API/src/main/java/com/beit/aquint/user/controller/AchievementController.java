package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.Achievement;
import com.beit.aquint.user.service.AchievementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/achievement")
public class AchievementController {

    @Autowired
    AchievementService achievementService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getAchievement(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting achievement detail Based On User");
            return ResponseEntity.ok().body(achievementService.getAchievement(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addAchievement(@RequestBody Achievement achievement) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(achievementService.addAchievement(achievement));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{achievementId}")
    public ResponseEntity<?> updateAchievement(@PathVariable(value = "achievementId") Long achievementId, @RequestBody Achievement achievement) {
        try {
            return ResponseEntity.ok().body(achievementService.updateAchievement(achievementId,achievement));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.UPLOAD_FILE + "/{userId}")
    public ResponseEntity<?> uploadAchievementFile(@RequestPart("file") MultipartFile file, @PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(achievementService.uploadDocument(file, userId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
