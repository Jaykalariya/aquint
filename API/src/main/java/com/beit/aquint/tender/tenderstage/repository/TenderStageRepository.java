package com.beit.aquint.tender.tenderstage.repository;

import com.beit.aquint.tender.tenderstage.entity.TenderStage;
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
public interface TenderStageRepository extends JpaRepository<TenderStage, Long> {

    List<TenderStage> findByStatus(Boolean status);

    @Query(value = "from TenderStage ts WHERE Lower(ts.tenderStageName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<TenderStage> findTenderStagePageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from TenderStage ts")
    Page<TenderStage> findTenderStagePageWithoutSearch(Pageable pageable);

    @Query(value = "SELECT td.id AS tender_id, td.project_name,td.project_display_name,td.tender_type,td.location,ts.tender_stage_name,td.modified_on FROM tender_stage ts RIGHT JOIN tender_details td ON ts.id=td.tender_stage WHERE ts.id=:stageId ORDER BY td.modified_on DESC", nativeQuery = true)
    List<Map<String,Object>> getAllTenderByStageId(@Param("stageId") Long stageId);
}
