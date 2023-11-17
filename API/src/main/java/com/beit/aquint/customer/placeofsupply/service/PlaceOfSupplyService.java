package com.beit.aquint.customer.placeofsupply.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.placeofsupply.entity.PlaceOfSupply;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 17/11/23  3:09 pm
 */
public interface PlaceOfSupplyService {

    public PlaceOfSupply addNewPlaceOfSupply(PlaceOfSupply placeOfSupply) throws AquintCommonException;

    public List<PlaceOfSupply> getAllPlaceOfSupply() throws AquintCommonException;

    public Page<PlaceOfSupply> getPlaceOfSupplyPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

}
