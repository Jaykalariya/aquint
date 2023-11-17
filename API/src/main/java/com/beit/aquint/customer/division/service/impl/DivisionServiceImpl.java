package com.beit.aquint.customer.division.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.customer.division.entity.Division;
import com.beit.aquint.customer.division.repository.DivisionRepository;
import com.beit.aquint.customer.division.service.DivisionService;
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
 * @since - 17/11/23  1:52 pm
 */
@Service
@Slf4j
public class DivisionServiceImpl implements DivisionService {

    @Autowired
    DivisionRepository divisionRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public Division addNewDivision(Division division) throws AquintCommonException {
        try {
            log.debug("Division Saving");
            return divisionRepository.save(division);
        } catch (Exception exception) {
            throw new AquintCommonException("Division Not Saved Properly");
        }
    }

    @Override
    public List<Division> getAllDivision() throws AquintCommonException {
        try {
            log.debug("Division Getting");
            return divisionRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Division Not Getting Properly");
        }
    }

    @Override
    public Page<Division> getDivisionPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return divisionRepository.findDivisionPageWithSearch(pageable, paginationRequestDto.getSearchBy());

            } else {
                return divisionRepository.findDivisionPageWithoutSearch(pageable);

            }
        } catch (Exception ex) {
            throw new AquintCommonException("Department Not fetch Properly");
        }
    }
}
