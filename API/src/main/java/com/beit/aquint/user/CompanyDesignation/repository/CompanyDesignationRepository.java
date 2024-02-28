package com.beit.aquint.user.CompanyDesignation.repository;

import com.beit.aquint.user.CompanyDesignation.entity.CompanyDesignation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyDesignationRepository extends JpaRepository<CompanyDesignation, Long> {

    List<CompanyDesignation> findByStatus(Boolean status);

    @Query(value = "from CompanyDesignation cd WHERE Lower(cd.companyDesignationName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<CompanyDesignation> findCompanyDesignationPageWithSearch(Pageable pageable,
                                                          @Param("search") String search);

    @Query(value = "from CompanyDesignation cd")
    Page<CompanyDesignation> findCompanyDesignationPageWithoutSearch(Pageable pageable);

//    @Query(value = "SELECT td.id AS tender_id, td.project_name,td.project_display_name,td.tender_type,td.location,ts.tender_stage_name,td.modified_on FROM tender_stage ts RIGHT JOIN tender_details td ON ts.id=td.tender_stage WHERE ts.id=:stageId ORDER BY td.modified_on DESC", nativeQuery = true)
//    List<Map<String,Object>> getAllTenderByStageId(@Param("stageId") Long stageId);
}
