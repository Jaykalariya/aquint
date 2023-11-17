package com.beit.aquint.customer.placeofsupply.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.customer.placeofsupply.entity.PlaceOfSupply;
import com.beit.aquint.customer.placeofsupply.repository.PlaceOfSupplyRepository;
import com.beit.aquint.customer.placeofsupply.service.PlaceOfSupplyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 17/11/23  3:09 pm
 */
@Service
@Slf4j
public class PlaceOfSupplyServiceImpl implements PlaceOfSupplyService {

    @Autowired
    PlaceOfSupplyRepository placeOfSupplyRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public PlaceOfSupply addNewPlaceOfSupply(PlaceOfSupply placeOfSupply) throws AquintCommonException {
        try {
            log.debug("Place Of Supply Saving");
            return placeOfSupplyRepository.save(placeOfSupply);
        } catch (Exception exception) {
            throw new AquintCommonException("Place Of Supply Not Saved Properly");
        }
    }

    @Override
    public List<PlaceOfSupply> getAllPlaceOfSupply() throws AquintCommonException {
        try {
            log.debug("Place Of Supply Getting");
            return placeOfSupplyRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Place Of Supply Not Getting Properly");
        }
    }

    @Override
    public Page<PlaceOfSupply> getPlaceOfSupplyPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return placeOfSupplyRepository.findPlaceOfSupplyPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return placeOfSupplyRepository.findPlaceOfSupplyPageWithoutSearch(pageable);

            }
        } catch (Exception ex) {
            throw new AquintCommonException("Place Of Supply Not fetch Properly");
        }
    }
}
