package com.beit.aquint.master.projectinitialsteps.repository;

import com.beit.aquint.master.projectinitialsteps.entity.ProjectInitialSteps;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProjectInitialStepsRepository extends JpaRepository<ProjectInitialSteps, Long> {

    List<ProjectInitialSteps> findByStatus(Boolean status);

    @Query(value = "from ProjectInitialSteps pis WHERE Lower(pis.stepName) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<ProjectInitialSteps> findProjectInitialStepsPageWithSearch(Pageable pageable,
                                                    @Param("search") String search);

    @Query(value = "from ProjectInitialSteps pis")
    Page<ProjectInitialSteps> findProjectInitialStepsPageWithoutSearch(Pageable pageable);

}
