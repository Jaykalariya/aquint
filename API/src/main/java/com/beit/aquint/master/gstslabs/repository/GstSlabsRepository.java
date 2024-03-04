package com.beit.aquint.master.gstslabs.repository;

import com.beit.aquint.master.gstslabs.entity.GstSlabs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface GstSlabsRepository extends JpaRepository<GstSlabs, Long> {

    @Query(value = "from GstSlabs gs")
    Page<GstSlabs> findGstSlabsPageWithoutSearch(Pageable pageable);

}
