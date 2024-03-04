package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.user.entity. FamilyMemberDetails;
import com.beit.aquint.user.repository. FamilyMemberDetailsRepository;
import com.beit.aquint.user.repository.UserDetailRepository;
import com.beit.aquint.user.service. FamilyMemberDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class FamilyMemberDetailsServiceImpl implements  FamilyMemberDetailsService {

    @Autowired
    UserDetailRepository userDetailsRepository;

    @Autowired
    FamilyMemberDetailsRepository familyMemberDetailsRepository;

    @Override
    public List<FamilyMemberDetails> getFamilyMemberDetails(Long userId) {
        try {
            return familyMemberDetailsRepository.findAllByUserId(userId);
        } catch (Exception exception) {
            throw new RuntimeException("Error retrieving users family member details", exception);
        }
    }

    @Override
    public ResponseMessage addFamilyMemberDetails(FamilyMemberDetails familyMemberDetails) throws AquintCommonException {
        try {
            return new ResponseMessage("Member saved successfully", familyMemberDetailsRepository.save(familyMemberDetails));
        } catch (Exception e) {
            throw new AquintCommonException("Error - " + e);
        }
    }

//    @Override
//    @Transactional
//    public ResponseMessage addFamilyMemberDetails(List<FamilyMemberDetails> familyMemberDetails) throws AquintCommonException {
//        try {
//            if(userDetailsRepository.findByUserId(familyMemberDetails.getFirst().getUserId()).getMaritalStatus().equals("UNMARRIED")){
//                for(FamilyMemberDetails familyMemberDetail : familyMemberDetails) {
//                    Set<String> nonValidRelations = new HashSet<>(Arrays.asList("WIFE", "HUSBAND", "SON", "DAUGHTER"));
//                    if(nonValidRelations.contains(familyMemberDetail.getRelation())){
//                        return new ResponseMessage("User is unmarried, Please remove Spouse and Children details or update yourself as MARRIED", null);
//                    }
//                }
//            }
//            return new ResponseMessage( "Member saved successfully",familyMemberDetailsRepository.saveAll(familyMemberDetails));
//        }
//        catch (Exception e) {
//            throw new AquintCommonException("Error - "+e);
//        }
//    }


    @Override
    public FamilyMemberDetails updateFamilyMemberDetails(Long familyMemberId, FamilyMemberDetails familyMemberDetails) {
        try {
            FamilyMemberDetails existingFamilyMemberDetails = familyMemberDetailsRepository.findById(familyMemberId).orElseThrow(() -> new NotFoundException("family member id Not found"));
            FamilyMemberDetails updatedFamilyMemberDetails = existingFamilyMemberDetails.builder()
                    .id(existingFamilyMemberDetails.getId())
                    .userId(existingFamilyMemberDetails.getUserId())
                    .familyMemberName(familyMemberDetails.getFamilyMemberName())
                    .birthDate(familyMemberDetails.getBirthDate())
                    .mobileNumber(familyMemberDetails.getMobileNumber())
                    .occupation(familyMemberDetails.getOccupation())
                    .relation(familyMemberDetails.getRelation())
                    .build();

            return familyMemberDetailsRepository.save(updatedFamilyMemberDetails);
        } catch (Exception exception) {
            throw new RuntimeException("Error updating users family member details", exception);
        }
    }
}