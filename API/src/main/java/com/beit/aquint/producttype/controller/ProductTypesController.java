package com.beit.aquint.producttype.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.producttype.entity.ProductTypes;
import com.beit.aquint.producttype.service.ProductTypesService;
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
@RequestMapping("/_v1/productTypes")
@Slf4j
public class ProductTypesController {

    @Autowired
    ProductTypesService productTypesService;

    @PostMapping(value = Constant.Mappping.PRODUCT_TYPE_ADD)
    public ResponseEntity<?> addProductTypes(@Valid @RequestBody ProductTypes productTypes) {
        try {
            log.debug("Creating Product Type");
            return ResponseEntity.ok().body(productTypesService.addNewProductTypes(productTypes));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.PRODUCT_TYPE_GET_ALL)
    public ResponseEntity<?> getAllProductTypes() {
        try {
            log.debug("Getting all product type");
            return ResponseEntity.ok().body(productTypesService.getAllProductTypes());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PRODUCT_TYPE_GET_WITH_PAGE)
    public ResponseEntity<?> getProductTypesPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all product type");
            return ResponseEntity.ok().body(productTypesService.getProductTypesPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Type Has Some Issue"));
        }
    }
}
