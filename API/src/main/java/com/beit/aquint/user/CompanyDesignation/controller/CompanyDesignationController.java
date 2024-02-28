package com.beit.aquint.user.CompanyDesignation.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.user.CompanyDesignation.dto.CompanyDesignationDto;
import com.beit.aquint.user.CompanyDesignation.entity.CompanyDesignation;
import com.beit.aquint.user.CompanyDesignation.service.CompanyDesignationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/user/companyDesignation")
@Slf4j
public class CompanyDesignationController {

    @Autowired
    CompanyDesignationService companyDesignationService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addCompanyDesignation(@Valid @RequestBody CompanyDesignation companyDesignation) {
        try {
            log.debug("Creating Company Designation");
            return ResponseEntity.ok().body(companyDesignationService.addCompanyDesignation(companyDesignation));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Designation Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllCompanyDesignation() {
        try {
            log.debug("Getting all Company Designation");
            return ResponseEntity.ok().body(companyDesignationService.getAllCompanyDesignation());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Designation Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL_ACTIVE)
    public ResponseEntity<?> getAllActiveCompanyDesignation() {
        try {
            log.debug("Getting all active Company Designation");
            return ResponseEntity.ok().body(companyDesignationService.getAllActiveCompanyDesignation());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Designation Has Some Issue"));
        }
    }

//    @GetMapping(value = Constant.Mappping.ALL_TENDER_DETAILS + "/{stageId}")
//    public ResponseEntity<?> getAllTenderByStageId(@PathVariable("stageId") Long stageId) {
//        try {
//            log.debug("Getting all Tenders");
//            return ResponseEntity.ok().body(tenderStageService.getAllTenderByStageId(stageId));
//        } catch (Exception exception) {
//            log.error(exception.getMessage());
//            return ResponseEntity.badRequest().body(new MessageResponse("Tender Stage Has Some Issue"));
//        }
//    }

    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getCompanyDesignationPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Company Designation");
            return ResponseEntity.ok().body(companyDesignationService.getCompanyDesignationPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Designation Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.CHANGE_STATUS)
    public ResponseEntity<?> changeCompanyDesignationStatus(@RequestBody CompanyDesignationDto companyDesignationDto) {
        try {
            return ResponseEntity.ok().body(companyDesignationService.changeCompanyDesignationStatus(companyDesignationDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Some issue occurred"));
        }
    }
}
