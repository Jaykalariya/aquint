package com.beit.aquint.master.unit.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.unit.entity.Unit;
import org.springframework.data.domain.Page;

import java.util.List;


public interface UnitService {

    public ResponseMessage addNewUnit(Unit unit) throws AquintCommonException;

    public List<Unit> getAllUnit() throws AquintCommonException;

    public Page<Unit> getUnitPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

}
