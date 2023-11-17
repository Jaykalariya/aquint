package com.beit.aquint.customer.department.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.department.entity.Department;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 16/11/23  7:00 pm
 */
public interface DepartmentService {

    public Department addNewDepartment(Department department) throws AquintCommonException;

    public List<Department> getAllDepartment() throws AquintCommonException;

    public Page<Department> getDepartmentPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
}
