package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.tender.tenderprocess.entity.TenderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  4:03 pm
 */
@Repository
public interface TenderHistoryRepository extends JpaRepository<TenderHistory, Long> {
}
