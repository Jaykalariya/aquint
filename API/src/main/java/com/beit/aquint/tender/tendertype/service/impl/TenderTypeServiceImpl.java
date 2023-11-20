package com.beit.aquint.tender.tendertype.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.tender.tendertype.entity.TenderType;
import com.beit.aquint.tender.tendertype.repository.TenderTypeRepository;
import com.beit.aquint.tender.tendertype.service.TenderTypeService;
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
 * @since - 20/11/23  11:28 pm
 */
@Service
@Slf4j
public class TenderTypeServiceImpl implements TenderTypeService {

    @Autowired
    TenderTypeRepository tenderTypeRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public TenderType addNewTenderType(TenderType tenderType) throws AquintCommonException {
        try {
            log.debug("Tender Type Saving");
            return tenderTypeRepository.save(tenderType);
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Type Not Saved Properly");
        }
    }

    @Override
    public List<TenderType> getAllTenderType() throws AquintCommonException {
        try {
            log.debug("Tender Type Getting");
            return tenderTypeRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Type Not Saved Properly");
        }
    }

    @Override
    public Page<TenderType> getTenderTypePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return tenderTypeRepository.findTenderTypePageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return tenderTypeRepository.findTenderTypePageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Tender Type Not fetch Properly");
        }
    }
}
