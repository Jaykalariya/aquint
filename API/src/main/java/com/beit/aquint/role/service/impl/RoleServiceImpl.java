package com.beit.aquint.role.service.impl;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.auth.repository.RoleRepository;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 29/10/23  10:04 pm
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PageUtilService pageUtilService;


    @Override
    public Role createNewRole(Role role) throws AquintCommonException {
        try {
            return roleRepository.save(role);

        } catch (Exception exception) {
            throw new AquintCommonException("Role Not Saved Properly");
        }
    }

    @Override
    public Page<Role> getRolePage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return roleRepository.findRolePageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return roleRepository.findRolePageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Role Not fetch Properly");
        }
    }

    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> getAllActiveRole() {
        return roleRepository.findAllActiveRole();
    }
}

