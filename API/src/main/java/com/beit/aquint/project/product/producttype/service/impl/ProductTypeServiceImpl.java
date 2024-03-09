package com.beit.aquint.project.product.producttype.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.project.product.producttype.entity.ProductType;
import com.beit.aquint.project.product.producttype.repository.ProductTypeRepository;
import com.beit.aquint.project.product.producttype.service.ProductTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@Slf4j
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    ProductTypeRepository productTypeRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public ProductType addNewProductType(ProductType productType) throws AquintCommonException {
        try {
            log.debug("Product Type Saving");
            return productTypeRepository.save(productType);
        } catch (Exception exception) {
            throw new AquintCommonException("Product Type Not Saved Properly");
        }
    }

    @Override
    public List<ProductType> getAllProductType() throws AquintCommonException {
        try {
            log.debug("Product Type Getting");
            return productTypeRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Product Type Not Saved Properly");
        }
    }

    @Override
    public List<ProductType> getAllProductTypesByProjectId(Long projectId) throws AquintCommonException{
        try {
            log.debug("Product type Getting");
            return productTypeRepository.findAllByProjectId(projectId);
        } catch (Exception exception) {
            throw new AquintCommonException("Product types Not fetched Properly");
        }
    }

    @Override
    public Page<ProductType> getProductTypePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return productTypeRepository.findProductTypePageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return productTypeRepository.findProductTypePageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Product Type Not fetch Properly");
        }
    }
}
