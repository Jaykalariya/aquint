package com.beit.aquint.customer.department.controller;

import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.department.entity.Department;
import com.beit.aquint.customer.department.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 16/11/23  6:59 pm
 */
@CrossOrigin("**")
@RestController
@RequestMapping("/_v1/department")
@Slf4j
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;


    @PostMapping(value = Constant.Mappping.DEPARTMENT_ADD)
    public ResponseEntity<?> addDepartment(@Valid @RequestBody Department department) {
        try {
            log.debug("Creating Department");
            return ResponseEntity.ok().body(departmentService.addNewDepartment(department));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Department Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.DEPARTMENT_GET_ALL)
    public ResponseEntity<?> getAllDepartment() {
        try {
            log.debug("Getting all Department");
            return ResponseEntity.ok().body(departmentService.getAllDepartment());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Department Has Some Issue"));
        }
    }

    @PostMapping(value = Constant.Mappping.DEPARTMENT_GET_PAGE)
    public ResponseEntity<?> getDepartmentPage(@RequestBody PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("Getting all Department");
            return ResponseEntity.ok().body(departmentService.getDepartmentPage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Department Has Some Issue"));
        }
    }
}
