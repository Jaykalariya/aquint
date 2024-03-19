package com.beit.aquint.master.customer.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.master.customer.entity.Customer;
import com.beit.aquint.master.customer.service.CustomerService;
import com.beit.aquint.master.vendor.entity.Vendor;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/customer")
@Slf4j
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addCustomer(@Valid @RequestBody Customer customer) {
        try {
            log.debug("Creating customer");
            return ResponseEntity.ok().body(customerService.addNewCustomer(customer));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllCustomer() {
        try {
            log.debug("Getting all customer");
            return ResponseEntity.ok().body(customerService.getAllCustomer());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Unit Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{id}")
    public ResponseEntity<?> getCustomerByCustomerId(@PathVariable("id") Long id) {
        try {
            log.debug("Getting customer by Id");
            return ResponseEntity.ok().body(customerService.getCustomerByID(id));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Has Some Issue"));
        }
    }



}
