package com.beit.aquint.customer.division.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.division.entity.Division;
import com.beit.aquint.customer.division.service.DivisionService;
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
 * @since - 17/11/23  1:50 pm
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/_v1/division")
@Slf4j
public class DivisionController {

    @Autowired
    DivisionService divisionService;

    @PostMapping(value = Constant.Mappping.DIVISION_ADD)
    public ResponseEntity<?> addDivision(@Valid @RequestBody Division division) {
        try {
            log.debug("Creating Division");
            return ResponseEntity.ok().body(divisionService.addNewDivision(division));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Division Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.DIVISION_GET_ALL)
    public ResponseEntity<?> getAllDivision() {
        try {
            log.debug("Getting all Division");
            return ResponseEntity.ok().body(divisionService.getAllDivision());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Division Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.DIVISION_GET_PAGE)
    public ResponseEntity<?> getDivisionPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Division");
            return ResponseEntity.ok().body(divisionService.getDivisionPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Division Has Some Issue"));
        }
    }
}
