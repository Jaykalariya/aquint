package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.HealthIssue;

import java.util.Optional;

public interface HealthIssueService {

    public HealthIssue addHealthIssue(HealthIssue healthIssue) throws AquintCommonException;

    public Optional<HealthIssue> getHealthIssue(Long userId);

    public HealthIssue updateHealthIssue(Long userId, HealthIssue healthIssue);
}
