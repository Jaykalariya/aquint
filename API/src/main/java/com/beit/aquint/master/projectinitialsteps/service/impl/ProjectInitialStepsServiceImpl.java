package com.beit.aquint.master.projectinitialsteps.service.impl;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.audit.EntityAuditInfo;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.projectinitialsteps.dto.ProjectInitialStepsDto;
import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import com.beit.aquint.master.projectinitialsteps.repository.ProjectInitialStepsRepository;
import com.beit.aquint.master.projectinitialsteps.service.ProjectInitialStepsService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;


@Service
@Slf4j
public class ProjectInitialStepsServiceImpl implements ProjectInitialStepsService {

    @Autowired
    ProjectInitialStepsRepository projectInitialStepsRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    @Transactional
    public ResponseMessage addNewProjectInitialSteps(ProjectInitialSteps projectInitialSteps) throws AquintCommonException {
        try {
            log.debug("Project Initial Step Saving");
            Integer stepOrder = projectInitialSteps.getStepOrder();
            Integer finalStepOrderNumber = getAllActiveProjectInitialSteps().get(getAllActiveProjectInitialSteps().size()-1).getStepOrder();
            if (stepOrder <= finalStepOrderNumber) {
               projectInitialStepsRepository.updateAllStepOrder(1,stepOrder);
            }
            else if(stepOrder > finalStepOrderNumber+1){
                projectInitialSteps.setStepOrder(finalStepOrderNumber+1);
            }
            return new ResponseMessage("Project Initial saved/updated successfully", projectInitialStepsRepository.save(projectInitialSteps));
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly "+exception);
        }
    }

    @Override
    public List<ProjectInitialSteps> getAllProjectInitialSteps() throws AquintCommonException {
        try {
            log.debug("Project Initial Step Getting");
            Sort sort = Sort.by(Sort.Order.asc("stepOrder"));
            return projectInitialStepsRepository.findAll(sort);
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly");
        }
    }

    @Override
    public List<ProjectInitialSteps> getAllActiveProjectInitialSteps() throws AquintCommonException {
        try {
            log.debug("Project Initial Step Getting");
            Sort sort = Sort.by(Sort.Order.asc("stepOrder"));
            return projectInitialStepsRepository.findByStatus(Boolean.TRUE, sort);
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly");
        }
    }

    @Override
    public Page<ProjectInitialSteps> getProjectInitialStepsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return projectInitialStepsRepository.findProjectInitialStepsPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return projectInitialStepsRepository.findProjectInitialStepsPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Project Initial Step Not fetch Properly");
        }
    }

    @Override
    @Transactional
    public MessageResponse changeProjectInitialStepsStatus(ProjectInitialStepsDto projectInitialStepsDto) throws AquintCommonException {
        try{
        ProjectInitialSteps projectInitialSteps = projectInitialStepsRepository.findById(projectInitialStepsDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for projectInitialStepsId: " + projectInitialStepsDto.getId()));
        projectInitialSteps.setStatus(projectInitialStepsDto.getStatus());

        //inactive stepOrder
        Integer stepOrder = projectInitialSteps.getStepOrder();
        projectInitialSteps.setStepOrder(-1);
        projectInitialStepsRepository.save(projectInitialSteps);
        projectInitialStepsRepository.updateAllStepOrder(-1,stepOrder+1);
        return new MessageResponse(String.format("%s status change to %s",projectInitialSteps.getStepName(),projectInitialSteps.getStatus()));
    }
catch (Exception exception) {
        throw new AquintCommonException("Status not changed - error "+exception);
        }
                }


//    @Transactional
//    public void updateStepOrder() {
//
//        List<ProjectInitialSteps> stepsToUpdate = projectInitialStepsRepository.findByStatusOrderByStepOrderAsc(true);
//
//        int incrementAmount = 1;
//
//        // Update step_order incrementally
//        for (ProjectInitialSteps step : stepsToUpdate) {
//            step.setStepOrder(step.getStepOrder() + incrementAmount);
//        }
//
//        // Save the updated entities
//        projectInitialStepsRepository.saveAll(stepsToUpdate);
//    }
}

