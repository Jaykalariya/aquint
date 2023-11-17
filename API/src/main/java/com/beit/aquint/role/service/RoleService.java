package com.beit.aquint.role.service;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 29/10/23  10:03 pm
 */
public interface RoleService {

    public Role createNewRole(Role role) throws AquintCommonException;

    public Page<Role> getRolePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

    public List<Role> getAllRole();
}
