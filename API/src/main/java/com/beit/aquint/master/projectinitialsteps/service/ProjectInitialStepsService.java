package com.beit.aquint.master.projectinitialsteps.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import org.springframework.data.domain.Page;

import java.util.List;


public interface ProjectInitialStepsService {

    public ResponseMessage addNewProjectInitialSteps(ProjectInitialSteps projectInitialSteps) throws AquintCommonException;

    public List<ProjectInitialSteps> getAllProjectInitialSteps() throws AquintCommonException;

    public List<ProjectInitialSteps> getAllActiveProjectInitialSteps() throws AquintCommonException;

    public Page<ProjectInitialSteps> getProjectInitialStepsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

//    public MessageResponse changeProjectInitialStepsStatus(ProjectInitialStepsDto projectInitialStepsDto);
}
