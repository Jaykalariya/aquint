package com.beit.aquint.tender.tenderstage.repository;

import com.beit.aquint.tender.tenderstage.entity.TenderStage;
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
}
