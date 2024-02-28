package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.user.entity.FamilyDetails;
import com.beit.aquint.user.repository.FamilyDetailsRepository;
import com.beit.aquint.user.service.FamilyDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyDetailsServiceImpl implements FamilyDetailsService {

    private final FamilyDetailsRepository familyDetailsRepository;

    @Autowired
    public FamilyDetailsServiceImpl(FamilyDetailsRepository familyDetailsRepository) {
        this.familyDetailsRepository = familyDetailsRepository;
    }

    @Override
    public FamilyDetails addFamilyDetails(FamilyDetails familyDetails) {
        return familyDetailsRepository.save(familyDetails);
    }

    @Override
    public Optional<FamilyDetails> getUserFamilyDetails(Long userId) {
        return familyDetailsRepository.findByUserId(userId);
    }

    @Override
    public List<FamilyDetails> getAllFamilyDetails() {
        return familyDetailsRepository.findAll();
    }

    @Override
    public FamilyDetails updateFamilyDetails(Long userId, FamilyDetails familyDetails) {
        FamilyDetails existingFamilyDetails = familyDetailsRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Family details not found with id: " + userId));

        if (existingFamilyDetails != null) {
            // Update fields as needed
            return familyDetailsRepository.save(existingFamilyDetails);
        } else {
            throw new NotFoundException("Family details not found for user with id: " + userId);
        }
    }

    // Add other methods as needed
}
