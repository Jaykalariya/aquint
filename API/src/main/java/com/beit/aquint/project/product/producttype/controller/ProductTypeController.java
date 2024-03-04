package com.beit.aquint.project.product.producttype.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.project.product.producttype.entity.ProductType;
import com.beit.aquint.project.product.producttype.service.ProductTypeService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project/productType")
@Slf4j
public class ProductTypeController {

    @Autowired
    ProductTypeService productTypeService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addProductType(@Valid @RequestBody ProductType productType) {
        try {
            log.debug("Creating Product Type");
            return ResponseEntity.ok().body(productTypeService.addNewProductType(productType));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllProductType() {
        try {
            log.debug("Getting all product type");
            return ResponseEntity.ok().body(productTypeService.getAllProductType());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getProductTypePage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all product type");
            return ResponseEntity.ok().body(productTypeService.getProductTypePage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Has Some Issue"));
        }
    }
}
