package com.beit.aquint.tender.tenderdashboard.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderdashboard.service.TenderDashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/tender")
@Slf4j
public class TenderDashboardController {

    @Autowired
    TenderDashboardService tenderDashboardService;

    @GetMapping(value = Constant.Mappping.TENDER_DASHBOARD)
    public ResponseEntity<?> getTenderDashboard() {
        try {
            log.debug("Getting Tender Dashboard");
            return ResponseEntity.ok().body(tenderDashboardService.getTenderDashboard());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting Tender Dashboard"));
        }
    }
}
