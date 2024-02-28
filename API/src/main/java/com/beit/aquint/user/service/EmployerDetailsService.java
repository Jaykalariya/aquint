package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.EmployerDetails;

import java.io.IOException;
import java.util.Optional;

public interface EmployerDetailsService {

    public EmployerDetails addEmployerDetails(EmployerDetails employerDetails) throws AquintCommonException;

    public Optional<EmployerDetails> getEmployerDetails(Long userId);

    public EmployerDetails updateEmployerDetails(Long userId, EmployerDetails employerDetails);
}
