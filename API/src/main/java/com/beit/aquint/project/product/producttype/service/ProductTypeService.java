package com.beit.aquint.project.product.producttype.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.project.product.producttype.entity.ProductType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductTypeService {

    public ProductType addNewProductType(ProductType productType) throws AquintCommonException;

    public List<ProductType> getAllProductType() throws AquintCommonException;

    public Page<ProductType> getProductTypePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

    public List<ProductType> getAllProductTypesByProjectId(Long projectId) throws AquintCommonException;
}
