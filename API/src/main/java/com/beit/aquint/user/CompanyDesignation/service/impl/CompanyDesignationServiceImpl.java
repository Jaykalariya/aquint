package com.beit.aquint.user.CompanyDesignation.service.impl;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.user.CompanyDesignation.dto.CompanyDesignationDto;
import com.beit.aquint.user.CompanyDesignation.entity.CompanyDesignation;
import com.beit.aquint.user.CompanyDesignation.repository.CompanyDesignationRepository;
import com.beit.aquint.user.CompanyDesignation.service.CompanyDesignationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class CompanyDesignationServiceImpl implements CompanyDesignationService {

    @Autowired
    CompanyDesignationRepository companyDesignationRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public CompanyDesignation addCompanyDesignation(CompanyDesignation companyDesignation) throws AquintCommonException {
        try {
            log.debug("Company Designation Saving");
            return companyDesignationRepository.save(companyDesignation);
        } catch (Exception exception) {
            throw new AquintCommonException("Company Designation Not Saved Properly");
        }
    }

    @Override
    public List<CompanyDesignation> getAllCompanyDesignation() throws AquintCommonException {
        try {
            log.debug("Company Designation Getting");
            return companyDesignationRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Company Designation Not Saved Properly");
        }
    }

    @Override
    public List<CompanyDesignation> getAllActiveCompanyDesignation() throws AquintCommonException {
        try {
            log.debug("Company Designation Getting");
            return companyDesignationRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Company Designation Not Saved Properly");
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
    public Page<CompanyDesignation> getCompanyDesignationPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return companyDesignationRepository.findCompanyDesignationPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return companyDesignationRepository.findCompanyDesignationPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Company Designation Not fetch Properly");
        }
    }

    @Override
    public MessageResponse changeCompanyDesignationStatus(CompanyDesignationDto companyDesignationDto){
        CompanyDesignation companyDesignation = companyDesignationRepository.findById(companyDesignationDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for companyDesignationId: " + companyDesignationDto.getId()));
        companyDesignation.setStatus(companyDesignationDto.getStatus());
        companyDesignationRepository.save(companyDesignation);
        return new MessageResponse(String.format("%s status change to %s",companyDesignation.getCompanyDesignationName(), companyDesignation.getStatus()));
    }
}
