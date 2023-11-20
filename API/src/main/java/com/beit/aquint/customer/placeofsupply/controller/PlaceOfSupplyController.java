package com.beit.aquint.customer.placeofsupply.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.placeofsupply.entity.PlaceOfSupply;
import com.beit.aquint.customer.placeofsupply.service.PlaceOfSupplyService;
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
 * @since - 17/11/23  3:08 pm
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/_v1/placeOfSupply")
@Slf4j
public class PlaceOfSupplyController {

    @Autowired
    PlaceOfSupplyService placeOfSupplyService;

    @PostMapping(value = Constant.Mappping.PLACE_OF_SUPPLY_ADD)
    public ResponseEntity<?> addPlaceOfSupply(@Valid @RequestBody PlaceOfSupply placeOfSupply) {
        try {
            log.debug("Creating Place Of Supply");
            return ResponseEntity.ok().body(placeOfSupplyService.addNewPlaceOfSupply(placeOfSupply));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Place Of Supply Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.PLACE_OF_SUPPLY_GET_ALL)
    public ResponseEntity<?> getAllPlaceOfSupply() {
        try {
            log.debug("Getting all Place Of Supply");
            return ResponseEntity.ok().body(placeOfSupplyService.getAllPlaceOfSupply());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Place Of Supply Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PLACE_OF_SUPPLY_GET_PAGE)
    public ResponseEntity<?> getPlaceOfSupplyPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Place Of Supply");
            return ResponseEntity.ok().body(placeOfSupplyService.getPlaceOfSupplyPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Place Of Supply Has Some Issue"));
        }
    }
}
