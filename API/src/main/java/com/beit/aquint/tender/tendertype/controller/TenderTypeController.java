package com.beit.aquint.tender.tendertype.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tendertype.entity.TenderType;
import com.beit.aquint.tender.tendertype.service.TenderTypeService;
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
@CrossOrigin("*")
@RestController
@RequestMapping("/_v1/tender/type")
@Slf4j
public class TenderTypeController {

    @Autowired
    TenderTypeService tenderTypeService;


    @PostMapping(value = Constant.Mappping.TENDER_TYPE_ADD)
    public ResponseEntity<?> addTenderType(@Valid @RequestBody TenderType tenderType) {
        try {
            log.debug("Creating Tender Type");
            return ResponseEntity.ok().body(tenderTypeService.addNewTenderType(tenderType));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Type Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.TENDER_TYPE_GET_ALL)
    public ResponseEntity<?> getAllTenderType() {
        try {
            log.debug("Getting all Tender Type");
            return ResponseEntity.ok().body(tenderTypeService.getAllTenderType());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Type Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.TENDER_TYPE_GET_PAGE)
    public ResponseEntity<?> getTenderTypePage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Tender Type");
            return ResponseEntity.ok().body(tenderTypeService.getTenderTypePage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Tender Type Has Some Issue"));
        }
    }
}
