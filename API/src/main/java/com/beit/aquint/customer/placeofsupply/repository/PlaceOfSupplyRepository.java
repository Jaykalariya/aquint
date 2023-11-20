package com.beit.aquint.customer.placeofsupply.repository;

import com.beit.aquint.customer.placeofsupply.entity.PlaceOfSupply;
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
 * @since - 17/11/23  3:12 pm
 */
@Repository
public interface PlaceOfSupplyRepository extends JpaRepository<PlaceOfSupply, Long> {

    List<PlaceOfSupply> findByStatus(Boolean status);

    @Query(value = "from PlaceOfSupply pos WHERE Lower(pos.stateName) LIKE Lower(CONCAT( '%', :search, '%'))" +
            "or Lower(pos.stateCode) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<PlaceOfSupply> findPlaceOfSupplyPageWithSearch(Pageable pageable,
                                                        @Param("search") String search);

    @Query(value = "from PlaceOfSupply pos")
    Page<PlaceOfSupply> findPlaceOfSupplyPageWithoutSearch(Pageable pageable);
}
