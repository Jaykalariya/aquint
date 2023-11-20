package com.beit.aquint.customer.division.repository;

import com.beit.aquint.customer.division.entity.Division;
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
 * @since - 17/11/23  1:53 pm
 */
@Repository
public interface DivisionRepository extends JpaRepository<Division, Long> {

    List<Division> findByStatus(Boolean status);

    @Query(value = "from Division dt WHERE Lower(dt.divisionName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<Division> findDivisionPageWithSearch(Pageable pageable,
                                              @Param("search") String search);

    @Query(value = "from Division dt")
    Page<Division> findDivisionPageWithoutSearch(Pageable pageable);
}
