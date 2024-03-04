package com.beit.aquint.tender.tenderstage.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderstage.dto.TenderStageDto;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    public ResponseMessage addNewTenderStage(TenderStage tenderStage) throws AquintCommonException;

    public List<TenderStage> getAllTenderStage() throws AquintCommonException;

    public List<TenderStage> getAllActiveTenderStage() throws AquintCommonException;



    public Page<TenderStage> getTenderStagePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

    public List<Map<String,Object>> getAllTenderByStageId(Long stageId) throws AquintCommonException;

    public MessageResponse changeTenderStageStatus(TenderStageDto tenderStageDto);
}
