package com.beit.aquint.role.service.impl;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.auth.repository.RoleRepository;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    @Override
    public Role createNewRole(Role role) throws AquintCommonException {
        try {
            return roleRepository.save(role);

        } catch (Exception exception) {
            throw new AquintCommonException("Role Not Saved Properly");
        }
    }
}
