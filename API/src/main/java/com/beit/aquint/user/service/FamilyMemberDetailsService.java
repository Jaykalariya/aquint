package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.user.entity.FamilyMemberDetails;

import java.util.List;
import java.util.Optional;

public interface FamilyMemberDetailsService {

    public ResponseMessage addFamilyMemberDetails(FamilyMemberDetails familyMemberDetails) throws AquintCommonException;

    public List<FamilyMemberDetails> getFamilyMemberDetails(Long userId);

    public FamilyMemberDetails updateFamilyMemberDetails(Long familyMemberId, FamilyMemberDetails familyMemberDetails);
}
