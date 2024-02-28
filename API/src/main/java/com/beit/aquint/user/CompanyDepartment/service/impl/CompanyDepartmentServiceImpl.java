package com.beit.aquint.user.CompanyDepartment.service.impl;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.user.CompanyDepartment.dto.CompanyDepartmentDto;
import com.beit.aquint.user.CompanyDepartment.entity.CompanyDepartment;
import com.beit.aquint.user.CompanyDepartment.repository.CompanyDepartmentRepository;
import com.beit.aquint.user.CompanyDepartment.service.CompanyDepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class CompanyDepartmentServiceImpl implements CompanyDepartmentService {

    @Autowired
    CompanyDepartmentRepository companyDepartmentRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public CompanyDepartment addCompanyDepartment(CompanyDepartment companyDepartment) throws AquintCommonException {
        try {
            log.debug("Company Department Saving");
            return companyDepartmentRepository.save(companyDepartment);
        } catch (Exception exception) {
            throw new AquintCommonException("Company Department Not Saved Properly");
        }
    }

    @Override
    public List<CompanyDepartment> getAllCompanyDepartment() throws AquintCommonException {
        try {
            log.debug("Company Department Getting");
            return companyDepartmentRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Company Department Not Saved Properly");
        }
    }

    @Override
    public List<CompanyDepartment> getAllActiveCompanyDepartment() throws AquintCommonException {
        try {
            log.debug("Company Department Getting");
            return companyDepartmentRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Company Department Not Saved Properly");
        }
    }

//    @Override
//    public List<Map<String,Object>> getAllTenderByStageId(Long stageId) throws AquintCommonException{
//        try {
//            log.debug("Getting tenders");
//            return tenderStageRepository.getAllTenderByStageId(stageId);
//        } catch (Exception exception) {
//                throw new AquintCommonException("Error");
//        }
//    }

    @Override
    public Page<CompanyDepartment> getCompanyDepartmentPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return companyDepartmentRepository.findCompanyDepartmentPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return companyDepartmentRepository.findCompanyDepartmentPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Company Department Not fetch Properly");
        }
    }

    @Override
    public MessageResponse changeCompanyDepartmentStatus(CompanyDepartmentDto companyDepartmentDto){
        CompanyDepartment companyDepartment = companyDepartmentRepository.findById(companyDepartmentDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for companyDepartmentId: " + companyDepartmentDto.getId()));
        companyDepartment.setStatus(companyDepartmentDto.getStatus());
        companyDepartmentRepository.save(companyDepartment);
        return new MessageResponse(String.format("%s status change to %s",companyDepartment.getCompanyDepartmentName(), companyDepartment.getStatus()));
    }
}
