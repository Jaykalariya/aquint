package com.beit.aquint.tender.tendertype.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tendertype.entity.TenderType;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 20/11/23  11:27 pm
 */
public interface TenderTypeService {

    public TenderType addNewTenderType(TenderType tenderType) throws AquintCommonException;

    public List<TenderType> getAllTenderType() throws AquintCommonException;

    public Page<TenderType> getTenderTypePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
}
