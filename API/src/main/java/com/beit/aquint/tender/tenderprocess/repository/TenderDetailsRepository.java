package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
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
 * @since - 28/01/24  3:59 pm
 */
@Repository
public interface TenderDetailsRepository extends JpaRepository<TenderDetails, Long> {

    @Query(value = "select * from tender_details td \n" +
            "where td.id in \n" +
            "(select tau.tender_id from tender_assigned_users tau where tau.user_id = :userId )", nativeQuery = true)
    public List<TenderDetails> findTenderByUser(@Param(value = "userId") Long userId);
}
