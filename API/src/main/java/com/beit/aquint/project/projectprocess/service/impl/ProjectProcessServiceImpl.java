package com.beit.aquint.project.projectprocess.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.project.projectprocess.dto.ProjectIdAndStepIdDto;
import com.beit.aquint.project.projectprocess.entity.ProjectDocuments;
import com.beit.aquint.project.projectprocess.entity.Projects;
import com.beit.aquint.project.projectprocess.repository.ProjectDocumentsRepository;
import com.beit.aquint.project.projectprocess.repository.ProjectsRepository;
import com.beit.aquint.project.projectprocess.service.ProjectProcessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
    FileUploadService fileUploadService;


    @Override
    public Projects addProject(Projects projects) {
        return projectsRepository.save(projects);
    }

    @Override
    public List<Projects> getAllProject() throws AquintCommonException {
        return projectsRepository.findAll();
    }

    @Override
    public ResponseMessage uploadProjectFile(MultipartFile multipartFile, ProjectIdAndStepIdDto projectIdAndStepIdDto) throws IOException {
        Long projectId = projectIdAndStepIdDto.getProjectId();
        Long stepId = projectIdAndStepIdDto.getStepId();
        String userFolderPath = Constant.File.PROJECT_DOCUMENTS + "/" + projectId + "/" + stepId;
        String documentName = multipartFile.getOriginalFilename();
        String documentUrl = fileUploadService.uploadFile(multipartFile, userFolderPath);
        String extension = fileUploadService.getExtension(multipartFile);
        ProjectDocuments projectDocuments = new ProjectDocuments(projectId,stepId,documentName,documentUrl,extension);
        projectDocumentRepository.save(projectDocuments);

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


}
