package com.beit.aquint.master.projectinitialsteps.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import com.beit.aquint.master.projectinitialsteps.repository.ProjectInitialStepsRepository;
import com.beit.aquint.master.projectinitialsteps.service.ProjectInitialStepsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public ResponseMessage addNewProjectInitialSteps(ProjectInitialSteps projectInitialSteps) throws AquintCommonException {
        try {
            log.debug("Project Initial Step Saving");
            return new ResponseMessage("Project Initial saved/updated successfully", projectInitialStepsRepository.save(projectInitialSteps));
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly");
        }
    }

    @Override
    public List<ProjectInitialSteps> getAllProjectInitialSteps() throws AquintCommonException {
        try {
            log.debug("Project Initial Step Getting");
            return projectInitialStepsRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly");
        }
    }

    @Override
    public List<ProjectInitialSteps> getAllActiveProjectInitialSteps() throws AquintCommonException {
        try {
            log.debug("Project Initial Step Getting");
            return projectInitialStepsRepository.findByStatus(Boolean.TRUE);
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

//    @Override
//    public MessageResponse changeProjectInitialStepsStatus(ProjectInitialStepsDto projectInitialStepsDto){
//        ProjectInitialSteps projectInitialSteps = projectInitialStepsRepository.findById(ProjectInitialStepsServiceImpl.this.projectInitialStepsDto.getId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for projectInitialStepsId: " + ProjectInitialStepsServiceImpl.this.projectInitialStepsDto.getId()));
//        ProjectInitialStepsServiceImpl.this.projectInitialSteps.setStatus(ProjectInitialStepsServiceImpl.this.projectInitialStepsDto.getStatus());
//        projectInitialStepsRepository.save(ProjectInitialStepsServiceImpl.this.projectInitialSteps);
//        return new MessageResponse(String.format("%s status change to %s",ProjectInitialStepsServiceImpl.this.projectInitialSteps.getProjectInitialStepsName(), ProjectInitialStepsServiceImpl.this.projectInitialSteps.getStatus()));
//    }
}
