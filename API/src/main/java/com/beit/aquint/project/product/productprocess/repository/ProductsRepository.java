package com.beit.aquint.project.product.productprocess.repository;

import com.beit.aquint.project.product.productprocess.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    @Query(value = "from Products p WHERE Lower(p.itemCode) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<Products> findProductsPageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from Products p")
    Page<Products> findProductsPageWithoutSearch(Pageable pageable);

    List<Products> findAllByProjectId(Long projectId);

    Products findProductById(Long id);
}
