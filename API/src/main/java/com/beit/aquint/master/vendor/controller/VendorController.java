package com.beit.aquint.master.vendor.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.vendor.entity.Vendor;
import com.beit.aquint.master.vendor.service.VendorService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/vendor")
@Slf4j
public class VendorController {

    @Autowired
    VendorService vendorService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addVendor(@Valid @RequestBody Vendor vendor) {
        try {
            log.debug("Creating Vendor");
            return ResponseEntity.ok().body(vendorService.addNewVendor(vendor));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllVendor() {
        try {
            log.debug("Getting all Vendor");
            return ResponseEntity.ok().body(vendorService.getAllVendor());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{id}")
    public ResponseEntity<?> getVendorByVendorId(@PathVariable("id") Long id) {
        try {
            log.debug("Getting vendor by Id");
            return ResponseEntity.ok().body(vendorService.getVendorByID(id));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Has Some Issue"));
        }
    }


}
