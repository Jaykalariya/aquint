package com.beit.aquint.producttype.repository;

import com.beit.aquint.producttype.entity.ProductType;
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
 * @since - 16/11/23  6:18 pm
 */
@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    List<ProductType> findByStatus(Boolean status);

    @Query(value = "from ProductType pt WHERE Lower(pt.name) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<ProductType> findProductTypePageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from ProductType pt")
    Page<ProductType> findProductTypePageWithoutSearch(Pageable pageable);
}
