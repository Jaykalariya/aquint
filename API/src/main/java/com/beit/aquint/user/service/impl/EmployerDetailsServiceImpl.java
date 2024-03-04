package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.EmployerDetails;
import com.beit.aquint.user.repository.EmployerDetailsRepository;
import com.beit.aquint.user.service.EmployerDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class EmployerDetailsServiceImpl implements EmployerDetailsService {

    @Autowired
    EmployerDetailsRepository employerDetailsRepository;

    @Override
    public Optional<EmployerDetails> getEmployerDetails(Long userId){
        try {
            return employerDetailsRepository.findByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users employer details", exception);
        }
    }

    @Override
    public EmployerDetails addEmployerDetails(EmployerDetails employerDetails) throws AquintCommonException {
        try {
            if(!employerDetailsRepository.existsByUserId(employerDetails.getUserId())){
                return employerDetailsRepository.save(employerDetails);
            }
            throw new AquintCommonException("UserId exists");

        } catch (Exception e) {
            throw new AquintCommonException("Error - "+e);
        }
    }

    @Override
    public EmployerDetails updateEmployerDetails(Long userId, EmployerDetails employerDetails) {
        try {
            EmployerDetails existingEmployerDetails = employerDetailsRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException("user id Not found"));;
            EmployerDetails updatedEmployerDetails = existingEmployerDetails.builder()
                    .id(existingEmployerDetails.getId())
                    .userId(existingEmployerDetails.getUserId())
                    .designation(employerDetails.getDesignation())
                    .department(employerDetails.getDepartment())
                    .ctc(employerDetails.getCtc())
                    .dateOfJoining(employerDetails.getDateOfJoining())
                    .pfDetails(employerDetails.getPfDetails())
                    .esicDetails(employerDetails.getEsicDetails())
                    .build();

            return employerDetailsRepository.save(updatedEmployerDetails);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating users employer details", exception);
        }
    }

}
