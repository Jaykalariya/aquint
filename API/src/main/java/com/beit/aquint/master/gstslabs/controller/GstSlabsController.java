package com.beit.aquint.master.gstslabs.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.gstslabs.entity.GstSlabs;
import com.beit.aquint.master.gstslabs.service.GstSlabsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project/gstSlabs")
@Slf4j
public class GstSlabsController {

    @Autowired
    GstSlabsService gstSlabsService;


    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addGstSlabs(@Valid @RequestBody GstSlabs gstSlabs) {
        try {
            log.debug("Creating GstSlab");
            return ResponseEntity.ok().body(gstSlabsService.addNewGstSlabs(gstSlabs));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("GstSlab Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllGstSlabs() {
        try {
            log.debug("Getting all GstSlabs");
            return ResponseEntity.ok().body(gstSlabsService.getAllGstSlabs());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("GstSlabs Has Some Issue"));
        }
    }


    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getGstSlabsPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all GstSlabs");
            return ResponseEntity.ok().body(gstSlabsService.getGstSlabsPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("GstSlabs Has Some Issue"));
        }
    }

}
