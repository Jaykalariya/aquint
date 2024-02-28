package com.beit.aquint.user.CompanyDepartment.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.user.CompanyDepartment.dto.CompanyDepartmentDto;
import com.beit.aquint.user.CompanyDepartment.entity.CompanyDepartment;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface CompanyDepartmentService {

    public CompanyDepartment addCompanyDepartment(CompanyDepartment companyDepartment) throws AquintCommonException;

    public List<CompanyDepartment> getAllCompanyDepartment() throws AquintCommonException;

    public List<CompanyDepartment> getAllActiveCompanyDepartment() throws AquintCommonException;


    public Page<CompanyDepartment> getCompanyDepartmentPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

//    public List<Map<String,Object>> getAllEmployeeByCompanyDepartmentId(Long stageId) throws AquintCommonException;

    public MessageResponse changeCompanyDepartmentStatus(CompanyDepartmentDto companyDepartmentDto);
}
