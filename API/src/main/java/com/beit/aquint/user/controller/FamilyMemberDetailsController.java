package com.beit.aquint.user.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.entity.FamilyMemberDetails;
import com.beit.aquint.user.service.FamilyMemberDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "**")
@RestController
@Slf4j
@RequestMapping("/_v1/user/familyMemberDetails")
public class FamilyMemberDetailsController {

    @Autowired
    FamilyMemberDetailsService familyMemberDetailsService;

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{userId}")
    public ResponseEntity<?> getFamilyMemberDetails(@PathVariable("userId") Long userId) {
        try {
            log.debug("Getting family member detail Based On User");
            return ResponseEntity.ok().body(familyMemberDetailsService.getFamilyMemberDetails(userId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addFamilyMemberDetails(@RequestBody FamilyMemberDetails familyMemberDetails) {
        try {
            log.debug("Adding Details");
            return ResponseEntity.ok().body(familyMemberDetailsService.addFamilyMemberDetails(familyMemberDetails));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Details Not Saved Properly"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{familyMemberId}")
    public ResponseEntity<?> updateFamilyMemberDetails(@PathVariable(value = "familyMemberId") Long familyMemberId, @RequestBody FamilyMemberDetails familyMemberDetails) {
        try {
            return ResponseEntity.ok().body(familyMemberDetailsService.updateFamilyMemberDetails(familyMemberId,familyMemberDetails));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
