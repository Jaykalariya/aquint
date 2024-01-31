package com.beit.aquint.tender.tenderprocess.service.impl;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderprocess.dto.TenderAddRequestDto;
import com.beit.aquint.tender.tenderprocess.entity.TenderAssignedUsers;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import com.beit.aquint.tender.tenderprocess.entity.TenderHistory;
import com.beit.aquint.tender.tenderprocess.mapper.TenderMapper;
import com.beit.aquint.tender.tenderprocess.repository.TenderAssignedUsersRepository;
import com.beit.aquint.tender.tenderprocess.repository.TenderDetailsRepository;
import com.beit.aquint.tender.tenderprocess.repository.TenderHistoryRepository;
import com.beit.aquint.tender.tenderprocess.service.TenderDetailsService;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:45 pm
 */
@Service
public class TenderDetailsServiceImpl implements TenderDetailsService {


    @Autowired
    TenderDetailsRepository tenderDetailsRepository;

    @Autowired
    TenderAssignedUsersRepository tenderAssignedUsersRepository;

    @Autowired
    TenderHistoryRepository tenderHistoryRepository;

    @Autowired
    UserService userService;


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
}
