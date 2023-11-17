package com.beit.aquint.role.controller;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.role.service.RoleService;
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
 * @since - 29/10/23  10:00 pm
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/_v1/role")
@Slf4j
public class RoleController {


    @Autowired
    RoleService roleService;

    @PostMapping(value = Constant.Mappping.ROLE_CREATE_UPDATE)
    public ResponseEntity<?> createNewRole(@Valid @RequestBody Role role) {
        try {
            log.debug("creating role");
            return ResponseEntity.ok().body(roleService.createNewRole(role));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Role Not saved Properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.ROLE_GET_ALL_WITH_PAGINATION)
    public ResponseEntity<?> getAllRolePage(@RequestParam PaginationRequestDto paginationRequestDto) {
        try {
            log.debug("GETTING ROLE PAGE CONTROLLER.......");
            return ResponseEntity.ok().body(roleService.getRolePage(paginationRequestDto));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Role List Not getting properly"));
        }
    }

    @GetMapping(value = Constant.Mappping.ROLE_GET_ALL)
    public ResponseEntity<?> getAllRole() {
        try {
            log.debug("GETTING ROLES CONTROLLER.......");
            return ResponseEntity.ok().body(roleService.getAllRole());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Role List Not getting properly"));
        }
    }


}
