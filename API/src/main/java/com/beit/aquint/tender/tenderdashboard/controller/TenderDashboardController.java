package com.beit.aquint.tender.tenderdashboard.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderdashboard.dto.DateFilterDto;
import com.beit.aquint.tender.tenderdashboard.service.TenderDashboardService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import software.amazon.ion.EmptySymbolException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/tender")
@Slf4j
public class TenderDashboardController {

    @Autowired
    TenderDashboardService tenderDashboardService;

    @GetMapping(value = Constant.Mappping.TENDER_DASHBOARD)
    public ResponseEntity<?> getTenderDashboard() {
        /**
         * <h1> TO BE USED LATER AFTER THE COMPLETE DASHBOARD </h1>
         * <p>
         * @RequestBody DateFilterDto dateFilter
         * To be used later to GET START AND END DATE FROM USER
         * For now the value is null and user gets all data from day 1
         * Also change to post mapping after the new changes from get mapping
         * </p>
         *
         * @author - Sahil
         * @since - 19/02/24  13:45 pm
         */

//        @RequestBody DateFilterDto dateFilter
        DateFilterDto dateFilter = new DateFilterDto();
        dateFilter.setStartDate(null);
        dateFilter.setEndDate(null);
        try {
            if (!(Objects.equals(dateFilter.getEndDate() == null, dateFilter.getStartDate() == null))) {
                return ResponseEntity.badRequest().body(new MessageResponse("One of the dates is null"));
            }
            log.debug("Getting Tender Dashboard");
            return   ResponseEntity.ok().body(tenderDashboardService.getTenderDashboard(dateFilter.getStartDate(),dateFilter.getEndDate()));
        } catch (Exception exception) {
            log.error("Error in Getting Tender Dashboard: {}", exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting Tender Dashboard"));
        }
    }

}
