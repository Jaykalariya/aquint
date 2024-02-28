package com.beit.aquint.user.CompanyDepartment.repository;

import com.beit.aquint.user.CompanyDepartment.entity.CompanyDepartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 20/11/23  11:28 pm
 */
@Repository
public interface CompanyDepartmentRepository extends JpaRepository<CompanyDepartment, Long> {

    List<CompanyDepartment> findByStatus(Boolean status);

    @Query(value = "from CompanyDepartment cd WHERE Lower(cd.companyDepartmentName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<CompanyDepartment> findCompanyDepartmentPageWithSearch(Pageable pageable,
                                                          @Param("search") String search);

    @Query(value = "from CompanyDepartment cd")
    Page<CompanyDepartment> findCompanyDepartmentPageWithoutSearch(Pageable pageable);

//    @Query(value = "SELECT td.id AS tender_id, td.project_name,td.project_display_name,td.tender_type,td.location,ts.tender_stage_name,td.modified_on FROM tender_stage ts RIGHT JOIN tender_details td ON ts.id=td.tender_stage WHERE ts.id=:stageId ORDER BY td.modified_on DESC", nativeQuery = true)
//    List<Map<String,Object>> getAllTenderByStageId(@Param("stageId") Long stageId);
}
