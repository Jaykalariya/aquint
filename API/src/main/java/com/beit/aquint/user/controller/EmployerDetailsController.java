package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.EmployerDetails;
import com.beit.aquint.user.service.EmployerDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/employerDetails")
public class EmployerDetailsController {

    @Autowired
    EmployerDetailsService employerDetailsService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getEmployerDetails(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting employer details detail Based On User");
            return ResponseEntity.ok().body(employerDetailsService.getEmployerDetails(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addEmployerDetails(@RequestBody EmployerDetails personalAccountDetails) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(employerDetailsService.addEmployerDetails(personalAccountDetails));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable(value = "userId") Long userId, @RequestBody EmployerDetails personalAccountDetails) {
        try {
            return ResponseEntity.ok().body(employerDetailsService.updateEmployerDetails(userId,personalAccountDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
