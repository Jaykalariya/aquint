package com.beit.aquint.customer.department.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.customer.department.entity.Department;
import com.beit.aquint.customer.department.repository.DepartmentRepository;
import com.beit.aquint.customer.department.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
@Service
@Slf4j
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    PageUtilService pageUtilService;


    @Override
    public Department addNewDepartment(Department department) throws AquintCommonException {
        try {
            log.debug("Department Saving");
            return departmentRepository.save(department);
        } catch (Exception exception) {
            throw new AquintCommonException("Department Not Saved Properly");
        }
    }

    @Override
    public List<Department> getAllDepartment() throws AquintCommonException {
        try {
            log.debug("Department Getting");
            return departmentRepository.findByStatus(Boolean.TRUE);
        } catch (Exception exception) {
            throw new AquintCommonException("Department Not Saved Properly");
        }
    }

    @Override
    public Page<Department> getDepartmentPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            return departmentRepository.findDepartmentPageWithSearch(pageable, paginationRequestDto.getSearchBy());
        } catch (Exception ex) {
            throw new AquintCommonException("Department Not fetch Properly");
        }
    }
}
