package com.beit.aquint.project.projectprocess.service;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.project.projectprocess.dto.ProjectIdAndStepIdDto;
import com.beit.aquint.project.projectprocess.entity.Projects;
import com.beit.aquint.tender.tenderprocess.dto.*;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import com.beit.aquint.tender.tenderprocess.entity.TenderNotes;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface ProjectProcessService {

    public Projects addProject(Projects projects);
    public List<Projects> getAllProject() throws AquintCommonException;

    public ResponseMessage uploadProjectFile(MultipartFile multipartFile, ProjectIdAndStepIdDto projectIdAndStepIdDto) throws IOException;

    public List<Map<String,Object>> getAllDocumentByProjectId(Long projectId);
    public List<Map<String,Object>> getAllDocumentByProjectIdAndStepId(ProjectIdAndStepIdDto projectIdAndStepIdDto);

    public Boolean existsByProjectCustomId(String projectCustomId);

    public Projects updateProject(Long projectId, Projects project);
}
