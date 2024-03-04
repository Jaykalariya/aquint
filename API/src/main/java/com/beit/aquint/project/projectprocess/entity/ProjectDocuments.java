package com.beit.aquint.project.projectprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "project_documents")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDocuments extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "project_id")
    private Long projectId;

    @NotNull
    @Column(name = "step_id")
    private Long stepId;

    @NotNull
    @Column(name = "document_name")
    private String documentName;

    @NotNull
    @Column(name = "document_url")
    private String documentUrl;

    @NotNull
    @Column(name = "extension")
    private String extension;

    public ProjectDocuments(Long projectId, Long stepId,String documentName, String documentUrl, String extension) {
        this.projectId = projectId;
        this.stepId = stepId;
        this.documentName = documentName;
        this.documentUrl = documentUrl;
        this.extension = extension;
    }
}