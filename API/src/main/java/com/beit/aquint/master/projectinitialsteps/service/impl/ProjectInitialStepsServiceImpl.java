package com.beit.aquint.master.projectinitialsteps.service.impl;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.projectinitialsteps.dto.ProjectInitialStepsDto;
import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import com.beit.aquint.master.projectinitialsteps.repository.ProjectInitialStepsRepository;
import com.beit.aquint.master.projectinitialsteps.service.ProjectInitialStepsService;
import com.beit.aquint.project.projectprocess.entity.Projects;
import com.beit.aquint.project.projectprocess.repository.ProjectsRepository;
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
    ProjectsRepository projectsRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    @Transactional
    public ResponseMessage addNewProjectInitialSteps(ProjectInitialSteps projectInitialSteps, String process) throws AquintCommonException {
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
            //Change Initial status in all projects
            updateInitialStepsStatus(0,-1,process,projectInitialSteps);

            return new ResponseMessage("Project Initial saved/updated successfully", projectInitialStepsRepository.save(projectInitialSteps));
        } catch (Exception exception) {
            throw new AquintCommonException("Project Initial Step Not Saved Properly "+exception);
        }
    }

    @Override
    public List<ProjectInitialSteps> getAllProjectInitialSteps() throws AquintCommonException {
        try {
            log.debug("Project Initial Step Getting");
            Sort sort = Sort.by(Sort.Order.desc("status"), Sort.Order.asc("stepOrder"));
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
    public MessageResponse changeProjectInitialStepsStatus(ProjectInitialStepsDto projectInitialStepsDto, String process) throws AquintCommonException {
try{
    ProjectInitialSteps projectInitialSteps = projectInitialStepsRepository.findById(projectInitialStepsDto.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No data found for projectInitialStepsId: " + projectInitialStepsDto.getId()));
            projectInitialSteps.setStatus(projectInitialStepsDto.getStatus());

    if(Boolean.FALSE.equals(projectInitialStepsDto.getStatus())) {
        //inactive stepOrder
        Integer stepOrder = projectInitialSteps.getStepOrder();
        projectInitialSteps.setStepOrder(-1);
        projectInitialStepsRepository.save(projectInitialSteps);
        projectInitialStepsRepository.updateAllStepOrder(-1, stepOrder + 1);
        //Change Initial status in all projects
        updateInitialStepsStatus(stepOrder, -1, process, null);
    }
        return new MessageResponse(String.format("%s status change to %s",projectInitialSteps.getStepName(),projectInitialSteps.getStatus()));
    }
catch (Exception exception) {
        throw new AquintCommonException("Status not changed - error "+exception);
        }
                }
    @Override
    @Transactional
    public ResponseMessage updateProjectInitialSteps(ProjectInitialSteps projectInitialSteps) throws AquintCommonException{
        try{
            Integer stepOrder = projectInitialSteps.getStepOrder();
            Integer previousStepOrder = projectInitialStepsRepository.findById(projectInitialSteps.getId()).get().getStepOrder();
            if(previousStepOrder>0){
            ProjectInitialStepsDto projectInitialStepsDto = new ProjectInitialStepsDto(projectInitialSteps.getId(), Boolean.FALSE);
            MessageResponse messageResponse = changeProjectInitialStepsStatus(projectInitialStepsDto, "UPDATE");
            if(messageResponse!=null){
                projectInitialSteps.setStepOrder(stepOrder);
                ResponseMessage responseMessage = addNewProjectInitialSteps(projectInitialSteps, "UPDATE");
                updateInitialStepsStatus(stepOrder,previousStepOrder,"UPDATE",null);
                return new ResponseMessage("PROJECT UPDATED", responseMessage);
            }
            throw new AquintCommonException("Message Response Empty");
        }
            else{
                ResponseMessage responseMessage = addNewProjectInitialSteps(projectInitialSteps, "ADD");
                return new ResponseMessage("PROJECT UPDATED", responseMessage);
            }
        }
       catch (Exception exception) {
            throw new AquintCommonException("Status not changed - error "+exception);
        }
    }

    private MessageResponse updateInitialStepsStatus(Integer stepOrder,Integer previousStepOrder,String process, ProjectInitialSteps newProjectInitialSteps) {
        if (process.equals("STATUS_CHANGE")) {
            //UPPER AS IT IS
            //CHANGE CURRENT AND LOWER BY 1
            List<Projects> projectsInStepOrder = projectsRepository.findAllByInitialStepsStatusGreaterThan(stepOrder - 1);
            for (Projects projects : projectsInStepOrder) {
                projects.setId(projects.getId());
                projects.setInitialStepsStatus(projects.getInitialStepsStatus() - 1);
            }
                projectsRepository.saveAll(projectsInStepOrder);
        return new MessageResponse("Initial Steps Status for All Projects Updated - STATUS CHANGE");
            }
        else if (process.equals("ADD")) {
            //UPPER AS IT IS
            //CHANGE CURRENT AND LOWER BY 1
            Integer newStepOrder = newProjectInitialSteps.getStepOrder();
            List<Projects> projectsInStepOrder = projectsRepository.findAllByInitialStepsStatusGreaterThan(newStepOrder - 1);

            if(Boolean.TRUE.equals(newProjectInitialSteps.getIsCompulsory())){
                for (Projects projects : projectsInStepOrder) {
                    projects.setId(projects.getId());
                    projects.setInitialStepsStatus(newStepOrder);
                }
                projectsRepository.saveAll(projectsInStepOrder);
                return new MessageResponse("Initial Steps Status for All Projects Updated - ADD Not Compulsory");
            }
            else{
                for (Projects projects : projectsInStepOrder) {
                    projects.setId(projects.getId());
                    projects.setInitialStepsStatus(projects.getInitialStepsStatus() + 1);
                }
            projectsRepository.saveAll(projectsInStepOrder);
            return new MessageResponse("Initial Steps Status for All Projects Updated - ADD Compulsory");
        }
        }

        else if (process.equals("UPDATE") && previousStepOrder!=-1) {
        System.out.println(previousStepOrder + " "+stepOrder);

            if(previousStepOrder < stepOrder){
                List<Projects> projectsInStepOrder = projectsRepository.findAllByInitialStepsStatusGreaterThanAndInitialStepsStatusLessThan(previousStepOrder-1, stepOrder + 1);
                for (Projects projects : projectsInStepOrder) {
                    if(projects.getInitialStepsStatus() == stepOrder){
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(projects.getInitialStepsStatus());
                    }
                    else {
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(projects.getInitialStepsStatus() - 1);
                    }
                }
                projectsRepository.saveAll(projectsInStepOrder);
                return new MessageResponse("Initial Steps Status for All Projects Updated - UPDATE Less");
            }
            else if(previousStepOrder > stepOrder){
                List<Projects> projectsInStepOrder = projectsRepository.findAllByInitialStepsStatusGreaterThanAndInitialStepsStatusLessThan(stepOrder-1, previousStepOrder + 1);
                for (Projects projects : projectsInStepOrder) {
                    if(projects.getInitialStepsStatus() == stepOrder){
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(projects.getInitialStepsStatus() - 1);
                    }
                    else if(projects.getInitialStepsStatus() == previousStepOrder){
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(previousStepOrder);
                    }
                    else if(Boolean.TRUE.equals(projectInitialStepsRepository.findByStepOrder(stepOrder).getIsCompulsory())){
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(stepOrder);
                    }
                    else {
                        projects.setId(projects.getId());
                        projects.setInitialStepsStatus(projects.getInitialStepsStatus() + 1);
                    }
                }
                projectsRepository.saveAll(projectsInStepOrder);
                return new MessageResponse("Initial Steps Status for All Projects Updated - UPDATE greater");
            }
            else{
                return new MessageResponse("No change");
            }
        }

        return new MessageResponse("Not in scope");
    }

}

