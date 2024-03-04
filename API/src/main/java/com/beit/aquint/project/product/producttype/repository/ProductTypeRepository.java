package com.beit.aquint.project.product.producttype.repository;

import com.beit.aquint.project.product.producttype.entity.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {


    @Query(value = "from ProductType pt WHERE Lower(pt.productTypeName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<ProductType> findProductTypePageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from ProductType pt")
    Page<ProductType> findProductTypePageWithoutSearch(Pageable pageable);
}
