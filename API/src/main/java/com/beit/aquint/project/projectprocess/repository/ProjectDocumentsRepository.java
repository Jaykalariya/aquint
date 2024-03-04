package com.beit.aquint.project.projectprocess.repository;


import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.project.projectprocess.entity.ProjectDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public interface ProjectDocumentsRepository extends JpaRepository<ProjectDocuments, Long> {
    @Query(value = Constant.ProjectQuery.DOCUMENTS_BY_PROJECT_ID ,nativeQuery = true)
    List<Map<String, Object>> getAllDocumentsByProjectId(@Param("projectId") Long projectId);

    @Query(value = Constant.ProjectQuery.DOCUMENTS_BY_PROJECT_ID_AND_STEP_ID ,nativeQuery = true)
    List<Map<String, Object>> getAllDocumentsByProjectIdAndStepId(@Param("projectId") Long projectId,@Param("stepId") Long stepId);

}