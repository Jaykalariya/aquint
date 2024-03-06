package com.beit.aquint.project.projectprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@Table(name = "projects",       uniqueConstraints = {
        @UniqueConstraint(columnNames = "project_custom_id")
})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Projects extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "project_custom_id")
    private String projectCustomId;

    @NotNull
    @Column(name = "tender_id")
    private Long tenderId;

    @NotBlank
    @Column(name = "project_display_name",columnDefinition = "TEXT")
    private String projectDisplayName;

    @Column(name = "initialStepsStatus")
    private Integer initialStepsStatus;

    @Column(name = "progress")
    private Integer progress;

    public Projects(Long tenderId,String projectDisplayName, Integer initialStepsStatus, Integer progress) {
        this.projectDisplayName = projectDisplayName;
        this.tenderId = tenderId;
        this.initialStepsStatus = initialStepsStatus;
        this.progress = progress;
    }
}
