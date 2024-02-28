package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.HealthIssue;
import com.beit.aquint.user.service.HealthIssueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/healthIssue")
public class HealthIssueController {

    @Autowired
    HealthIssueService healthIssueService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getHealthIssue(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting health issue detail Based On User");
            return ResponseEntity.ok().body(healthIssueService.getHealthIssue(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addHealthIssue(@RequestBody HealthIssue healthIssue) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(healthIssueService.addHealthIssue(healthIssue));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{userId}")
    public ResponseEntity<?> updateHealthIssue(@PathVariable(value = "userId") Long userId, @RequestBody HealthIssue healthIssue) {
        try {
            return ResponseEntity.ok().body(healthIssueService.updateHealthIssue(userId,healthIssue));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
