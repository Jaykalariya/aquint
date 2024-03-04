package com.beit.aquint.producttype.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.producttype.entity.ProductTypes;
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
public interface ProductTypesService {

    public ProductTypes addNewProductTypes(ProductTypes productTypes) throws AquintCommonException;

    public List<ProductTypes> getAllProductTypes() throws AquintCommonException;

    public Page<ProductTypes> getProductTypesPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
}
