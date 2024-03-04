package com.beit.aquint.tender.tenderstage.service.impl;

import com.beit.aquint.auth.models.User;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.tender.tenderstage.dto.TenderStageDto;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
import com.beit.aquint.tender.tenderstage.repository.TenderStageRepository;
import com.beit.aquint.tender.tenderstage.service.TenderStageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

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
public class TenderStageServiceImpl implements TenderStageService {

    @Autowired
    TenderStageRepository tenderStageRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public ResponseMessage addNewTenderStage(TenderStage tenderStage) throws AquintCommonException {
        try {
            log.debug("Tender Stage Saving");
            if(tenderStage.getStageValue()!=3 && Boolean.TRUE.equals(tenderStageRepository.existsByStageValue(tenderStage.getStageValue()))){
                return new ResponseMessage("Tender Stage already exists for FINAL WIN or FINAL LOSS", tenderStage);
            }
            return new ResponseMessage("Tender stage saved/updated successfully", tenderStageRepository.save(tenderStage));
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Stage Not Saved Properly");
        }
    }

    @Override
    public List<TenderStage> getAllTenderStage() throws AquintCommonException {
        try {
            log.debug("Tender Stage Getting");
            return tenderStageRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Stage Not Saved Properly");
        }
    }

    @Override
    public List<TenderStage> getAllActiveTenderStage() throws AquintCommonException {
        try {
            log.debug("Tender Stage Getting");
            return tenderStageRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Stage Not Saved Properly");
        }
    }

    @Override
    public List<Map<String,Object>> getAllTenderByStageId(Long stageId) throws AquintCommonException{
        try {
            log.debug("Getting tenders");
            return tenderStageRepository.getAllTenderByStageId(stageId);
        } catch (Exception exception) {
                throw new AquintCommonException("Error");
        }
    }

    @Override
    public Page<TenderStage> getTenderStagePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return tenderStageRepository.findTenderStagePageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return tenderStageRepository.findTenderStagePageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Tender Stage Not fetch Properly");
        }
    }

    @Override
    public MessageResponse changeTenderStageStatus(TenderStageDto tenderStageDto){
        TenderStage tenderStage = tenderStageRepository.findById(tenderStageDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for tenderStageId: " + tenderStageDto.getId()));
        tenderStage.setStatus(tenderStageDto.getStatus());
        tenderStageRepository.save(tenderStage);
        return new MessageResponse(String.format("%s status change to %s",tenderStage.getTenderStageName(), tenderStage.getStatus()));
    }
}
