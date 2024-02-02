package com.beit.aquint.tender.tenderprocess.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderprocess.dto.ChangeStageDto;
import com.beit.aquint.tender.tenderprocess.dto.TenderAddRequestDto;
import com.beit.aquint.tender.tenderprocess.service.TenderDetailsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:44 pm
 */
@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/tender")
@Slf4j
public class TenderProcessController {

    @Autowired
    TenderDetailsService tenderStageService;


    @PostMapping(value = Constant.Mappping.ADD_NEW_TENDER)
    public ResponseEntity<?> addNewTender(@Valid @RequestBody TenderAddRequestDto tenderAddRequestDto) {
        try {
            log.debug("Adding New Tender");
            return ResponseEntity.ok().body(tenderStageService.addTenderDetails(tenderAddRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Not Saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL_TENDER_BASED_ON_USER)
    public ResponseEntity<?> getUserBasedTenders() {
        try {
            log.debug("Getting all Tender Based On User");
            return ResponseEntity.ok().body(tenderStageService.getUserBasedTenderList());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting all Tender Based On User"));
        }
    }


    @PostMapping(value = Constant.Mappping.CHANGE_STAGE)
    public ResponseEntity<?> changeStage(@Valid @RequestBody ChangeStageDto changeStageDto) {
        try {
            log.debug("Changing tender stage");
            return ResponseEntity.ok().body(tenderStageService.changeStage(changeStageDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Stage not changed Properly"));
        }
    }
}
