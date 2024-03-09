package com.beit.aquint.project.product.productprocess.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.project.product.productprocess.entity.Products;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductProcessService {

    public Products addNewProduct(Products products) throws AquintCommonException;

    public List<Products> getAllProducts() throws AquintCommonException;

    public Page<Products> getProductsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

    public List<Products> getAllProductsByProjectId(Long projectId) throws AquintCommonException;
}
