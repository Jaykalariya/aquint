package com.beit.aquint.tender.tenderprocess.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.tender.tenderprocess.dto.*;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import com.beit.aquint.tender.tenderprocess.entity.TenderNotes;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public List<TenderFullDetailsDto> getAllTenderFullDetail();

    public Page<TenderFullDetailsDto> getTenderPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

    public ResponseMessage uploadTenderFile(MultipartFile multipartFile, Long tenderId) throws IOException;

    public TenderFullDetailsDto getTenderFullDetail(Long tenderId);

    public List<TenderTimelineDto> getTenderTimeline(Long tenderId);

    public TenderNotes addTenderNotes(TenderNotes tenderNotes) throws AquintCommonException;;

    public List<TenderNotesDto> getTenderNotes(Long tenderId) throws AquintCommonException ;

    public List<TenderDocumentDto> getAllDocumentByTenderId(Long tenderId);

    public ResponseMessage deleteTenderFile(Long documentId);
}
