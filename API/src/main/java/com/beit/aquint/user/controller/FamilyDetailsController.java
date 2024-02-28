package com.beit.aquint.user.controller;

import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.FamilyDetails;
import com.beit.aquint.user.service.FamilyDetailsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "**")
@RestController
@RequestMapping("/_v1/user/familyDetails")
@Slf4j
public class FamilyDetailsController {

    @Autowired
    private FamilyDetailsService familyDetailsService;

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<List<FamilyDetails>> getAllFamilyDetails() {
        try {
            List<FamilyDetails> allFamilyDetails = familyDetailsService.getAllFamilyDetails();
            return ResponseEntity.ok().body(allFamilyDetails);
        } catch (Exception exception) {
            // Handle exceptions and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getUserFamilyDetails(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok().body(familyDetailsService.getUserFamilyDetails(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addFamilyDetails(@Valid @RequestBody FamilyDetails familyDetails) {
        try {
            return ResponseEntity.ok().body(familyDetailsService.addFamilyDetails(familyDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE + "/{userId}")
    public ResponseEntity<?> updateFamilyDetails(@PathVariable(value = "userId") Long userId, @RequestBody FamilyDetails familyDetails) {
        try {
            return ResponseEntity.ok().body(familyDetailsService.updateFamilyDetails(userId, familyDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Failed to update family details",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    // Add other endpoints as needed

}
