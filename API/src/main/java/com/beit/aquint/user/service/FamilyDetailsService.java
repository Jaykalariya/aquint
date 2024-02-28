package com.beit.aquint.user.service;

import com.beit.aquint.user.entity.FamilyDetails;

import java.util.List;
import java.util.Optional;

public interface FamilyDetailsService {

    FamilyDetails addFamilyDetails(FamilyDetails familyDetails);

    Optional<FamilyDetails> getUserFamilyDetails(Long userId);

    List<FamilyDetails> getAllFamilyDetails();

    FamilyDetails updateFamilyDetails(Long userId, FamilyDetails familyDetails);

    // Add other methods as needed

}
