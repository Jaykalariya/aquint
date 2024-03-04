package com.beit.aquint.master.unit.repository;

import com.beit.aquint.master.unit.entity.Unit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

    @Query(value = "from Unit u WHERE Lower(u.unitName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<Unit> findUnitPageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from Unit u")
    Page<Unit> findUnitPageWithoutSearch(Pageable pageable);

}
