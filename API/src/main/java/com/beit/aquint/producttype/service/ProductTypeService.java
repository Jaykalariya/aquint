package com.beit.aquint.producttype.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.producttype.entity.ProductType;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 16/11/23  6:17 pm
 */
public interface ProductTypeService {

    public ProductType addNewProductType(ProductType productType) throws AquintCommonException;

    public List<ProductType> getAllProductType() throws AquintCommonException;

    public Page<ProductType> getProductTypePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
}
