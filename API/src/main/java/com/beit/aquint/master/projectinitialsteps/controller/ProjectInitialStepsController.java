package com.beit.aquint.master.projectinitialsteps.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import com.beit.aquint.master.projectinitialsteps.service.ProjectInitialStepsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/project/projectInitialSteps")
@Slf4j
public class ProjectInitialStepsController {

    @Autowired
    ProjectInitialStepsService projectInitialStepsService;


    @PostMapping(value = Constant.Mappping.ADD)
    public ResponseEntity<?> addProjectInitialSteps(@Valid @RequestBody ProjectInitialSteps projectInitialSteps) {
        try {
            log.debug("Creating Project Initial Steps");
            return ResponseEntity.ok().body(projectInitialStepsService.addNewProjectInitialSteps(projectInitialSteps));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Project Initial Steps Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL)
    public ResponseEntity<?> getAllProjectInitialSteps() {
        try {
            log.debug("Getting all Project Initial Steps");
            return ResponseEntity.ok().body(projectInitialStepsService.getAllProjectInitialSteps());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Project Initial Steps Has Some Issue"));
        }
    }

    @GetMapping(value = Constant.Mappping.GET_ALL_ACTIVE)
    public ResponseEntity<?> getAllActiveProjectInitialSteps() {
        try {
            log.debug("Getting all Project Initial Steps");
            return ResponseEntity.ok().body(projectInitialStepsService.getAllActiveProjectInitialSteps());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Project Initial Steps Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.PAGE)
    public ResponseEntity<?> getProjectInitialStepsPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Project Initial Steps");
            return ResponseEntity.ok().body(projectInitialStepsService.getProjectInitialStepsPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Project Initial Steps Has Some Issue"));
        }
    }

//    @PostMapping(value = Constant.Mappping.CHANGE_TENDER_STAGE_STATUS)
//    public ResponseEntity<?> changeProjectInitialStepsStatus(@RequestBody ProjectInitialStepsDto projectInitialStepsDto) {
//        try {
//            return ResponseEntity.ok().body(projectInitialStepsService.changeProjectInitialStepsStatus(projectInitialStepsDto));
//        } catch (Exception exception) {
//            log.error(exception.getMessage());
//            return ResponseEntity.badRequest().body(new MessageResponse("Some issue occurred"));
//        }
//    }
}
