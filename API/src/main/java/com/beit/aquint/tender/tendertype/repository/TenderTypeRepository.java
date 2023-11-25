package com.beit.aquint.tender.tendertype.repository;

import com.beit.aquint.tender.tendertype.entity.TenderType;
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
public interface TenderTypeRepository extends JpaRepository<TenderType, Long> {

    List<TenderType> findByStatus(Boolean status);

    @Query(value = "from TenderType ts WHERE Lower(ts.tenderTypeName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<TenderType> findTenderTypePageWithSearch(Pageable pageable,
                                                  @Param("search") String search);

    @Query(value = "from TenderType ts")
    Page<TenderType> findTenderTypePageWithoutSearch(Pageable pageable);
}
