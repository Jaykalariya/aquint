package com.beit.aquint.project.projectprocess.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.responses.ErrorResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.project.projectprocess.dto.ProjectCardDto;
import com.beit.aquint.project.projectprocess.dto.ProjectCustomId;
import com.beit.aquint.project.projectprocess.dto.ProjectIdAndStepIdDto;
import com.beit.aquint.project.projectprocess.entity.Projects;
import com.beit.aquint.project.projectprocess.service.ProjectProcessService;
import com.beit.aquint.user.entity.Achievement;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project")
@Slf4j
public class ProjectProcessController {

    @Autowired
    ProjectProcessService projectProcessService;


    //ProjectsAPI
    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addNewProject(@Valid @RequestBody Projects projects) {
        try {
            log.debug("Adding New Project");
            return ResponseEntity.ok().body(projectProcessService.addProject(projects));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Project Not Saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllProject() {
        try {
            log.debug("Getting all Project");
            return ResponseEntity.ok().body(projectProcessService.getAllProject());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting all Project"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL+ "Ingoing")
    public ResponseEntity<?> getAllIngoingProject() {
        try {
            log.debug("Getting all Ingoing Project");
            return ResponseEntity.ok().body(projectProcessService.getAllIngoingProject());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting all Ingoing Project"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL + "Completed")
    public ResponseEntity<?> getAllCompletedProject() {
        try {
            log.debug("Getting all Completed Project");
            return ResponseEntity.ok().body(projectProcessService.getAllCompletedProject());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error in Getting all Completed Project"));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE  + "/{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable(value = "projectId") Long projectId, @RequestBody Projects project) {
        try {
            return ResponseEntity.ok().body(projectProcessService.updateProject(projectId,project));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping(value = Constant.Mappping.UPDATE + Constant.Mappping.PROJECT_CUSTOM_ID)
    public ResponseEntity<?> updateProject(@RequestBody ProjectCustomId projectCustomId) {
        try {
            return ResponseEntity.ok().body(projectProcessService.updateProjectCustomId(projectCustomId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Updated Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    //Doucments API
    @PostMapping(value = Constant.Mappping.UPLOAD_FILE)
    public ResponseEntity<?> uploadProjectFile(@RequestPart("file") MultipartFile file,@RequestPart("projectIdAndStepIdDto") ProjectIdAndStepIdDto projectIdAndStepIdDto) {
        try {
            return ResponseEntity.ok().body(projectProcessService.uploadProjectFile(file, projectIdAndStepIdDto));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "Data Not Saved Properly",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


    @GetMapping(value = Constant.Mappping.ALL_DOCUMENTS + "/{projectId}")
    public ResponseEntity<?> getAllDocumentByProjectId(@PathVariable("projectId") Long projectId) {
        try {
            return ResponseEntity.ok().body(projectProcessService.getAllDocumentByProjectId(projectId));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "NO DATA WAS FETCHED",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = Constant.Mappping.ALL_DOCUMENTS)
    public ResponseEntity<?> getAllDocumentByProjectIdAndStepId(@RequestBody ProjectIdAndStepIdDto projectIdAndStepIdDto) {
        try {
            return ResponseEntity.ok().body(projectProcessService.getAllDocumentByProjectIdAndStepId(projectIdAndStepIdDto));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(
                    new ErrorResponse(
                            "NO DATA WAS FETCHED",
                            HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


}
