package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.HealthIssue;
import com.beit.aquint.user.repository.HealthIssueRepository;
import com.beit.aquint.user.service.HealthIssueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class HealthIssueServiceImpl implements HealthIssueService {

    @Autowired
    HealthIssueRepository healthIssueRepository;

    @Override
    public List<HealthIssue> getHealthIssue(Long userId){
        try {
            return healthIssueRepository.findAllByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users health issue", exception);
        }
    }

    @Override
    public HealthIssue addHealthIssue(HealthIssue healthIssue) throws AquintCommonException {
        try {
                return healthIssueRepository.save(healthIssue);
        } catch (Exception e) {
            throw new AquintCommonException("Error - "+e);
        }
    }

    @Override
    public HealthIssue updateHealthIssue(Long healthIssueId, HealthIssue healthIssue) {
        try {
            HealthIssue existingHealthIssue = healthIssueRepository.findById(healthIssueId).orElseThrow(() -> new NotFoundException("health issue id Not found"));
            HealthIssue updatedHealthIssue = existingHealthIssue.builder()
                    .id(existingHealthIssue.getId())
                    .userId(existingHealthIssue.getUserId())
                    .healthIssueName(healthIssue.getHealthIssueName())
                    .healthIssueDescription(healthIssue.getHealthIssueDescription())
                    .build();

            return healthIssueRepository.save(updatedHealthIssue);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating users health issue", exception);
        }
    }

}
