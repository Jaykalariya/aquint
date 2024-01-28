package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:59 pm
 */
@Repository
public interface TenderDetailsRepository extends JpaRepository<TenderDetails, Long> {
}
