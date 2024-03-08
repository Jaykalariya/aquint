package com.beit.aquint.project.projectprocess.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.project.projectprocess.repository.ProjectsRepository;

import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.master.projectinitialsteps.repository.ProjectInitialStepsRepository;
import com.beit.aquint.master.projectinitialsteps.service.ProjectInitialStepsService;
import com.beit.aquint.project.projectprocess.dto.ProjectIdAndStepIdDto;
import com.beit.aquint.project.projectprocess.entity.ProjectDocuments;
import com.beit.aquint.project.projectprocess.entity.Projects;
import com.beit.aquint.project.projectprocess.repository.ProjectDocumentsRepository;
import com.beit.aquint.project.projectprocess.service.ProjectProcessService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Slf4j
@Service
public class ProjectProcessServiceImpl implements ProjectProcessService {


    @Autowired
    ProjectsRepository projectsRepository;
    @Autowired
    ProjectDocumentsRepository projectDocumentRepository;

    @Autowired
    ProjectInitialStepsRepository projectInitialStepsRepository;

    @Autowired
    FileUploadService fileUploadService;


    @Override
    public Projects addProject(Projects projects) {
        return projectsRepository.save(projects);
    }

    @Override
    public List<Projects> getAllProject() throws AquintCommonException {
    try{
        return projectsRepository.findAll();
    } catch (Exception exception) {
        throw new AquintCommonException("Something went wrong");
    }
    }

    @Override
    public List<Map<String, Object>> getAllIngoingProject() throws AquintCommonException {
     try{
            return projectsRepository.findAllByProgressLessThanByStepId();
    } catch (Exception exception) {
        throw new AquintCommonException("Something went wrong");
        }
    }

    @Override
    public List<Projects> getAllCompletedProject() throws AquintCommonException {
    try{
        return projectsRepository.findAllByProgress(100);
    } catch (Exception exception) {
        throw new AquintCommonException("Something went wrong");
        }
    }

    @Override
    public Projects updateProject(Long projectId, Projects project){
        try {
            Projects existingProject = projectsRepository.findById(projectId).orElseThrow(() -> new NotFoundException("Project id Not found"));
            Projects updatedProject = existingProject.builder()
                    .id(existingProject.getId())
                    .projectCustomId(existingProject.getProjectCustomId())
                    .projectDisplayName(existingProject.getProjectDisplayName())
                    .tenderId(existingProject.getTenderId())
                    .build();

            return projectsRepository.save(updatedProject);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating project", exception);
        }
    }

    @Override
    @Transactional
    public ResponseMessage uploadProjectFile(MultipartFile multipartFile, ProjectIdAndStepIdDto projectIdAndStepIdDto) throws IOException {
        Long projectId = projectIdAndStepIdDto.getProjectId();
        Long stepId = projectIdAndStepIdDto.getStepId();
        Integer stepOrder = projectInitialStepsRepository.findById(stepId).orElseThrow(() -> new NotFoundException("Step id Not found")).getStepOrder();
        String userFolderPath = Constant.File.PROJECT_DOCUMENTS + "/" + projectId + "/" + stepId;
        String documentName = multipartFile.getOriginalFilename();
        String documentUrl = fileUploadService.uploadFile(multipartFile, userFolderPath);
        String extension = fileUploadService.getExtension(multipartFile);
        ProjectDocuments projectDocuments = new ProjectDocuments(projectId,stepId,documentName,documentUrl,extension);
        projectDocumentRepository.save(projectDocuments);

        //change project's stepStatus if required
        Projects projects = projectsRepository.findById(projectId).orElseThrow(() -> new NotFoundException("Project id Not found"));
        if(projects.getInitialStepsStatus()<stepOrder){
            projects.setInitialStepsStatus(stepOrder);
            projectsRepository.save(projects);
        }
        return new ResponseMessage("File successfully uploaded and tender history saved", projectDocuments);
    }

    @Override
    public List<Map<String, Object>> getAllDocumentByProjectId(Long projectId) {
        return projectDocumentRepository.getAllDocumentsByProjectId(projectId);
    }

    @Override
    public List<Map<String, Object>> getAllDocumentByProjectIdAndStepId(ProjectIdAndStepIdDto projectIdAndStepIdDto) {
        Long projectId = projectIdAndStepIdDto.getProjectId();
        Long stepId = projectIdAndStepIdDto.getStepId();
        return projectDocumentRepository.getAllDocumentsByProjectIdAndStepId(projectId, stepId);
    }

    @Override
    public Boolean existsByProjectCustomId(String projectCustomId){
        return projectsRepository.existsByProjectCustomId(projectCustomId);
    }



}
