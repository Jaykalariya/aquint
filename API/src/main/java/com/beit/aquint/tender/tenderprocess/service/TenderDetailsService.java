package com.beit.aquint.tender.tenderprocess.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.tender.tenderprocess.dto.ChangeStageDto;
import com.beit.aquint.tender.tenderprocess.dto.TenderAddRequestDto;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;

import java.util.List;
import java.util.Map;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:44 pm
 */
public interface TenderDetailsService {

    public TenderDetails addTenderDetails(TenderAddRequestDto tenderAddRequestDto);

    public List<Map<String, Object>> getUserBasedTenderList();

    public MessageResponse changeStage(ChangeStageDto changeStageDto);
}
