package com.beit.aquint.tender.tenderstage.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
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
public interface TenderStageService {

    public TenderStage addNewTenderStage(TenderStage tenderStage) throws AquintCommonException;

    public List<TenderStage> getAllTenderStage() throws AquintCommonException;

    public Page<TenderStage> getTenderStagePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
}
