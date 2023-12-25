package com.beit.aquint.producttype.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.producttype.entity.ProductType;
import com.beit.aquint.producttype.service.ProductTypeService;
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
 * @since - 16/11/23  6:17 pm
 */
@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/productType")
@Slf4j
public class ProductTypeController {

    @Autowired
    ProductTypeService productTypeService;

    @PostMapping(value = Constant.Mappping.PRODUCT_TYPE_ADD)
    public ResponseEntity<?> addProductType(@Valid @RequestBody ProductType productType) {
        try {
            log.debug("Creating Product Type");
            return ResponseEntity.ok().body(productTypeService.addNewProductType(productType));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.PRODUCT_TYPE_GET_ALL)
    public ResponseEntity<?> getAllProductType() {
        try {
            log.debug("Getting all product type");
            return ResponseEntity.ok().body(productTypeService.getAllProductType());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PRODUCT_TYPE_GET_WITH_PAGE)
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
