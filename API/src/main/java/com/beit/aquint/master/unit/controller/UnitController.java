package com.beit.aquint.master.unit.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.unit.entity.Unit;
import com.beit.aquint.master.unit.service.UnitService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project/unit")
@Slf4j
public class UnitController {

    @Autowired
    UnitService unitService;


    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addUnit(@Valid @RequestBody Unit unit) {
        try {
            log.debug("Creating Unit");
            return ResponseEntity.ok().body(unitService.addNewUnit(unit));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllUnit() {
        try {
            log.debug("Getting all Unit");
            return ResponseEntity.ok().body(unitService.getAllUnit());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Has Some Issue"));
        }
    }


    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getUnitPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Unit");
            return ResponseEntity.ok().body(unitService.getUnitPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Has Some Issue"));
        }
    }

}
