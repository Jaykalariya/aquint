package com.beit.aquint.tender.tenderstage.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderstage.dto.TenderStageDto;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
import com.beit.aquint.tender.tenderstage.service.TenderStageService;
import com.beit.aquint.user.dto.UserFullDetailsDto;
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
 * @since - 20/11/23  11:25 pm
 */
@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/tender/stage")
@Slf4j
public class TenderStageController {

    @Autowired
    TenderStageService tenderStageService;


    @PostMapping(value = Constant.Mappping.TENDER_STAGE_ADD)
    public ResponseEntity<?> addTenderStage(@Valid @RequestBody TenderStage tenderStage) {
        try {
            log.debug("Creating Tender Stage");
            return ResponseEntity.ok().body(tenderStageService.addNewTenderStage(tenderStage));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.TENDER_STAGE_GET_ALL)
    public ResponseEntity<?> getAllTenderStage() {
        try {
            log.debug("Getting all Tender Stage");
            return ResponseEntity.ok().body(tenderStageService.getAllTenderStage());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.ACTIVE_TENDER_STAGE_GET_ALL)
    public ResponseEntity<?> getAllActiveTenderStage() {
        try {
            log.debug("Getting all Tender Stage");
            return ResponseEntity.ok().body(tenderStageService.getAllActiveTenderStage());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.ALL_TENDER_DETAILS + "/{stageId}")
    public ResponseEntity<?> getAllTenderByStageId(@PathVariable("stageId") Long stageId) {
        try {
            log.debug("Getting all Tenders");
            return ResponseEntity.ok().body(tenderStageService.getAllTenderByStageId(stageId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.TENDER_STAGE_GET_PAGE)
    public ResponseEntity<?> getTenderStagePage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Tender Stage");
            return ResponseEntity.ok().body(tenderStageService.getTenderStagePage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.CHANGE_TENDER_STAGE_STATUS)
    public ResponseEntity<?> changeTenderStageStatus(@RequestBody TenderStageDto tenderStageDto) {
        try {
            return ResponseEntity.ok().body(tenderStageService.changeTenderStageStatus(tenderStageDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Some issue occurred"));
        }
    }
}
