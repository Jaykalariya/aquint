package com.beit.aquint.project.projectprocess.repository;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.project.projectprocess.dto.ProjectCard;
import com.beit.aquint.project.projectprocess.dto.ProjectCardDto;
import com.beit.aquint.project.projectprocess.entity.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Long> {

    Boolean existsByTenderId(Long id);

    Boolean existsByProjectCustomId(String projectCustomId);

    List<Projects> findAllByProgress(int progress);

    List<Projects> findAllByProgressLessThan(int progress);

    List<Projects> findAllByInitialStepsStatus(int initialStepsStatus);

    List<Projects> findAllByInitialStepsStatusLessThan(int initialStepsStatus);

    List<Projects> findAllByInitialStepsStatusGreaterThan(int initialStepsStatus);

    List<Projects> findAllByInitialStepsStatusGreaterThanAndInitialStepsStatusLessThan(int initialStepsStatus, int initialStepsStatus1);

    @Query(value = Constant.ProjectQuery.PROJECT_LIST_ONGOING_WITH_STEID ,nativeQuery = true)
    List<Map<String, Object>> findAllByProgressLessThanByStepId();
}
