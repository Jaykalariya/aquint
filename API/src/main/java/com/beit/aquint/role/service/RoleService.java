package com.beit.aquint.role.service;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.common.config.exception.AquintCommonException;

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
}
