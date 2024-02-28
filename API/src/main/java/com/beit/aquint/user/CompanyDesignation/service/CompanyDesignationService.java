package com.beit.aquint.user.CompanyDesignation.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.user.CompanyDesignation.dto.CompanyDesignationDto;
import com.beit.aquint.user.CompanyDesignation.entity.CompanyDesignation;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CompanyDesignationService {

    public CompanyDesignation addCompanyDesignation(CompanyDesignation companyDesignation) throws AquintCommonException;

    public List<CompanyDesignation> getAllCompanyDesignation() throws AquintCommonException;

    public List<CompanyDesignation> getAllActiveCompanyDesignation() throws AquintCommonException;


    public Page<CompanyDesignation> getCompanyDesignationPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

//    public List<Map<String,Object>> getAllEmployeeByCompanyDesignationId(Long stageId) throws AquintCommonException;

    public MessageResponse changeCompanyDesignationStatus(CompanyDesignationDto companyDesignationDtoDto);
}
