package com.beit.aquint.user.CompanyDepartment.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderstage.dto.TenderStageDto;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
import com.beit.aquint.tender.tenderstage.service.TenderStageService;
import com.beit.aquint.user.CompanyDepartment.dto.CompanyDepartmentDto;
import com.beit.aquint.user.CompanyDepartment.entity.CompanyDepartment;
import com.beit.aquint.user.CompanyDepartment.service.CompanyDepartmentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/user/companyDepartment")
@Slf4j
public class CompanyDepartmentController {

    @Autowired
    CompanyDepartmentService companyDepartmentService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addCompanyDepartment(@Valid @RequestBody CompanyDepartment companyDepartment) {
        try {
            log.debug("Creating Company Department");
            return ResponseEntity.ok().body(companyDepartmentService.addCompanyDepartment(companyDepartment));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Department Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllCompanyDepartment() {
        try {
            log.debug("Getting all Company Department");
            return ResponseEntity.ok().body(companyDepartmentService.getAllCompanyDepartment());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Department Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL_ACTIVE)
    public ResponseEntity<?> getAllActiveCompanyDepartment() {
        try {
            log.debug("Getting all active Company Department");
            return ResponseEntity.ok().body(companyDepartmentService.getAllActiveCompanyDepartment());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Department Has Some Issue"));
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
    public ResponseEntity<?> getCompanyDepartmentPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Company Department");
            return ResponseEntity.ok().body(companyDepartmentService.getCompanyDepartmentPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Company Department Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.CHANGE_STATUS)
    public ResponseEntity<?> changeCompanyDepartmentStatus(@RequestBody CompanyDepartmentDto companyDepartmentDto) {
        try {
            return ResponseEntity.ok().body(companyDepartmentService.changeCompanyDepartmentStatus(companyDepartmentDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Some issue occurred"));
        }
    }
}
