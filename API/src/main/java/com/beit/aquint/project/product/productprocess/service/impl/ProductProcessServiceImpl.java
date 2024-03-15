package com.beit.aquint.project.product.productprocess.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.project.product.productprocess.entity.Products;
import com.beit.aquint.project.product.productprocess.repository.ProductsRepository;
import com.beit.aquint.project.product.productprocess.service.ProductProcessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@Slf4j
public class ProductProcessServiceImpl implements ProductProcessService {

    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public Products addNewProduct(Products product) throws AquintCommonException {
        try {
            log.debug("Product Saving");
            return productsRepository.save(product);
        } catch (Exception exception) {
            throw new AquintCommonException("Product Not Saved Properly");
        }
    }

    @Override
    public List<Products> getAllProducts() throws AquintCommonException {
        try {
            log.debug("Product Getting");
            return productsRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Product Not Saved Properly");
        }
    }

    @Override
    public List<Products> getAllProductsByProjectId(Long projectId) throws AquintCommonException{
        try {
            log.debug("Product Getting");
            return productsRepository.findAllByProjectId(projectId);
        } catch (Exception exception) {
            throw new AquintCommonException("Product Not fetched Properly");
        }

    }

    @Override
    public Products getProductById(Long id) throws AquintCommonException {
        try {
            log.debug("Product Getting");
            return productsRepository.findProductById(id);
        } catch (Exception exception) {
            throw new AquintCommonException("Product Not fetched Properly");
        }    }

    @Override
    public Page<Products> getProductsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return productsRepository.findProductsPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return productsRepository.findProductsPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Product Not fetch Properly");
        }
    }
}
