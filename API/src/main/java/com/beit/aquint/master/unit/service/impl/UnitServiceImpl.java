package com.beit.aquint.master.unit.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.unit.entity.Unit;
import com.beit.aquint.master.unit.repository.UnitRepository;
import com.beit.aquint.master.unit.service.UnitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@Slf4j
public class UnitServiceImpl implements UnitService {

    @Autowired
    UnitRepository unitRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public ResponseMessage addNewUnit(Unit unit) throws AquintCommonException {
        try {
            log.debug("Unit Saving");
            return new ResponseMessage("Unit saved/updated successfully", unitRepository.save(unit));
        } catch (Exception exception) {
            throw new AquintCommonException("Unit Not Saved Properly");
        }
    }

    @Override
    public List<Unit> getAllUnit() throws AquintCommonException {
        try {
            log.debug("Unit Getting");
            return unitRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Unit Not Saved Properly");
        }
    }

    @Override
    public Page<Unit> getUnitPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return unitRepository.findUnitPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return unitRepository.findUnitPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Unit Not fetch Properly");
        }
    }


}
