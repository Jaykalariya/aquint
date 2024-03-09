package com.beit.aquint.project.product.productprocess.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.project.product.productprocess.entity.Products;
import com.beit.aquint.project.product.productprocess.service.ProductProcessService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project/product")
@Slf4j
public class ProductProcessController {

    @Autowired
    ProductProcessService productProcessService;

    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addProduct(@Valid @RequestBody Products products) {
        try {
            log.debug("Creating Product");
            return ResponseEntity.ok().body(productProcessService.addNewProduct(products));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllProducts() {
        try {
            log.debug("Getting all product");
            return ResponseEntity.ok().body(productProcessService.getAllProducts());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_DETAILS + "/{projectId}")
    public ResponseEntity<?> getAllProductsByProjectId(@PathVariable("projectId") Long projectId) {
        try {
            log.debug("Getting all products by project Id");
            return ResponseEntity.ok().body(productProcessService.getAllProductsByProjectId(projectId));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getProductPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all product");
            return ResponseEntity.ok().body(productProcessService.getProductsPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Product Has Some Issue"));
        }
    }
}
