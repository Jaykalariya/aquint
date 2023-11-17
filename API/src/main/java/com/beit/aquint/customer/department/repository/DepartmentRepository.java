package com.beit.aquint.customer.department.repository;

import com.beit.aquint.customer.department.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 16/11/23  7:09 pm
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findByStatus(Boolean status);

    @Query(value = "from Department dt WHERE Lower(dt.departmentName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<Department> findDepartmentPageWithSearch(Pageable pageable,
                                                  @Param("search") String search);

    @Query(value = "from Department dt")
    Page<Department> findDepartmentPageWithoutSearch(Pageable pageable);
}
