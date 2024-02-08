package com.beit.aquint.tender.tenderprocess.service.impl;

import com.amazonaws.services.xray.model.Http;
import com.beit.aquint.auth.models.User;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.auth.security.services.UserDetailsServiceImpl;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.tender.tenderprocess.dto.*;
import com.beit.aquint.tender.tenderprocess.entity.*;
import com.beit.aquint.tender.tenderprocess.mapper.TenderMapper;
import com.beit.aquint.tender.tenderprocess.repository.*;
import com.beit.aquint.tender.tenderprocess.service.TenderDetailsService;
import com.beit.aquint.tender.tenderstage.entity.TenderStage;
import com.beit.aquint.tender.tenderstage.repository.TenderStageRepository;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:45 pm
 */
@Slf4j
@Service
public class TenderDetailsServiceImpl implements TenderDetailsService {


    @Autowired
    TenderDetailsRepository tenderDetailsRepository;

    @Autowired
    TenderAssignedUsersRepository tenderAssignedUsersRepository;

    @Autowired
    TenderHistoryRepository tenderHistoryRepository;

    @Autowired
    TenderStageRepository tenderStageRepository;

    @Autowired
    UserService userService;

    @Autowired
    PageUtilService pageUtilService;

    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    TenderDocumentsRepository tenderDocumentsRepository;

    @Autowired
    TenderNotesRepository tenderNotesRepository;



    @Override
    @Transactional
    public TenderDetails addTenderDetails(TenderAddRequestDto tenderAddRequestDto) {

        TenderDetails details = TenderMapper.getTenderDetails(tenderAddRequestDto);
        details = tenderDetailsRepository.save(details);

        List<TenderAssignedUsers> tenderAssignedUsersList = new ArrayList<>();
        for (Long userId : tenderAddRequestDto.getAssignedUsers()) {
            tenderAssignedUsersList.add(TenderMapper.getTenderAssignedUsers(details.getId(), userId));
        }
        tenderAssignedUsersRepository.saveAll(tenderAssignedUsersList);
        UserDetail currentUser = userService.getCurrentUserDetails();
        TenderHistory tenderHistory = new TenderHistory();
        tenderHistory.setTenderId(details.getId());
        tenderHistory.setName(Constant.TenderHistoryConstant.ADD_NEW_TENDER + currentUser.getFirstname() + " " + currentUser.getLastname());
        tenderHistory.setUserId(null);
        tenderHistoryRepository.save(tenderHistory);


        List<TenderHistory> tenderMemberHistorys = new ArrayList<>();
        for (Long userId : tenderAddRequestDto.getAssignedUsers()) {
            TenderHistory tenderMemberHistory = new TenderHistory();
            UserDetail memberDetails = userService.getUserDetail(userId);
            tenderMemberHistory.setTenderId(details.getId());
            tenderMemberHistory.setName(memberDetails.getFirstname() + " " + memberDetails.getLastname() + Constant.TenderHistoryConstant.ADD_NEW_MEMBER + currentUser.getFirstname() + " " + currentUser.getLastname());
            tenderMemberHistory.setUserId(null);
            tenderMemberHistorys.add(tenderMemberHistory);
        }
        tenderHistoryRepository.saveAll(tenderMemberHistorys);

        return details;
    }

    @Override
    public List<Map<String, Object>> getUserBasedTenderList() {
        Long userId = userService.getCurrentUserPrivateInfo().getId();
        List<Map<String, Object>> resultList = tenderDetailsRepository.findTenderByUser(userId);
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (Map<String, Object> result : resultList) {
            String assignedUserString = (String) result.get("assignedUser");
            Map<String, Object> map =  new HashMap<>();
            map.putAll(result);
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                List<Map<String, Object>> assignedUserList = objectMapper.readValue(assignedUserString, new TypeReference<List<Map<String, Object>>>() {
                });
                map.put("assignedUser", assignedUserList);
                responseList.add(map);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return responseList;
    }


    @Override
    @Transactional
    public MessageResponse changeStage(ChangeStageDto changeStageDto) {
        TenderDetails tender = tenderDetailsRepository.findById(changeStageDto.getTenderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for tenderId: " + changeStageDto.getTenderId()));
        TenderStage stage = tenderStageRepository.findById(changeStageDto.getStageId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for StageId: " + changeStageDto.getStageId()));
        UserDetail currentUser = userService.getCurrentUserDetails();

        tender.setTenderStage(changeStageDto.getStageId());
        tenderDetailsRepository.save(tender);

        TenderHistory tenderMemberHistory = new TenderHistory();
        tenderMemberHistory.setTenderId(changeStageDto.getTenderId());
        tenderMemberHistory.setName(String.format("%s %s By %s", Constant.TenderHistoryConstant.STAGED_CHANGED, stage.getTenderStageName(), currentUser.getFirstname()+ " " +currentUser.getLastname()));
        tenderMemberHistory.setUserId(null);
        tenderHistoryRepository.save(tenderMemberHistory);

        return new MessageResponse("Tender Staged changed and History added Successfully");
    }

    @Override
    public List<TenderFullDetailsDto> getAllTenderFullDetail() {
        return tenderDetailsRepository.getAllTenderFullDetail();
    }


    @Override
    public TenderFullDetailsDto getTenderFullDetail(Long tenderId) {
        return tenderDetailsRepository.getTenderFullDetail(tenderId);
    }

    @Override
    public List<TenderTimelineDto> getTenderTimeline(Long tenderId) {
        return tenderDetailsRepository.getTenderTimeline(tenderId);
    }

    @Override
    public Page<TenderFullDetailsDto> getTenderPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            User user = userService.getCurrentUserPrivateInfo();
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return tenderDetailsRepository.findTenderPageWithSearch(pageable, paginationRequestDto.getSearchBy(),user.getId());
            } else {
                return tenderDetailsRepository.findTenderPageWithoutSearch(pageable,user.getId());
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Tenders throws exception");
        }
    }

    @Override
    @Transactional
    public ResponseMessage uploadTenderFile(MultipartFile multipartFile, Long tenderId) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_TENDER_FILES + "/" + tenderId;
        String documentName = multipartFile.getOriginalFilename();
        String documentUrl = fileUploadService.uploadFile(multipartFile, userFolderPath);
        String extension = fileUploadService.getExtension(multipartFile);
        TenderDocuments tenderDocument = new TenderDocuments(tenderId,documentName,documentUrl,extension);
        tenderDocumentsRepository.save(tenderDocument);
        saveTenderHistory(tenderId,String.format("%s %s ",documentName, Constant.TenderHistoryConstant.UPLOADED_BY), null);
        return new ResponseMessage("File successfully uploaded and tender history saved", tenderDocument);
    }

    @Override
    public List<TenderDocumentDto> getAllDocumentByTenderId(Long tenderId){
            return tenderDocumentsRepository.getAllDocumentByTenderId(tenderId);
    }

    @Override
    @Transactional
    public TenderNotes addTenderNotes(TenderNotes tenderNotes) throws AquintCommonException {
        try {
            log.debug("Tender Stage Saving");
            return tenderNotesRepository.save(tenderNotes);
        } catch (Exception exception) {
            throw new AquintCommonException("Tender Note Not Saved Properly");
        }
    }

    @Override
    public List<TenderNotesDto> getTenderNotes(Long tenderId)  throws AquintCommonException {
        try {
            log.debug("Getting Tender Notes");
            return tenderNotesRepository.tenderNotesByTenderId(tenderId);
        } catch (Exception exception) {
            throw new AquintCommonException("Unable to Fetch");
        }
    }


    private boolean saveTenderHistory(Long tenderId, String name, Long userId){
        UserDetail currentUser = userService.getCurrentUserDetails();
        TenderHistory tenderMemberHistory = new TenderHistory();
        tenderMemberHistory.setTenderId(tenderId);
        tenderMemberHistory.setName(name + currentUser.getFirstname()+ " " +currentUser.getLastname());
        tenderMemberHistory.setUserId(userId);
        tenderHistoryRepository.save(tenderMemberHistory);
        return true;
    }

}
