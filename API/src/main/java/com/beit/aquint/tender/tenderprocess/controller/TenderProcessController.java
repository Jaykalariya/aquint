package com.beit.aquint.tender.tenderprocess.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderprocess.dto.ChangeStageDto;
import com.beit.aquint.tender.tenderprocess.dto.TenderAddRequestDto;
import com.beit.aquint.tender.tenderprocess.service.TenderDetailsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    TenderDetailsService tenderDetailsService;


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

    @GetMapping(value = Constant.Mappping.ALL_TENDER_DETAILS)
    public ResponseEntity<?> getAllTenderFullDetails() {
        try {
            return ResponseEntity.ok().body(tenderDetailsService.getAllTenderFullDetail());
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "No Data",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.TENDER_GET_ALL_WITH_PAGINATION)
    public ResponseEntity<?> getTenderPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Tenders");
            return ResponseEntity.ok().body(tenderDetailsService.getTenderPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Getting Tenders Has Some Issue"));
        }
    }
}
