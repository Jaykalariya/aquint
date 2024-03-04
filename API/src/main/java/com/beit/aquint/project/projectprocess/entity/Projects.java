package com.beit.aquint.project.projectprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


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

    @NotBlank
    @Column(name = "project_custom_id")
    private String projectCustomId;

    @Column(name = "project_name",columnDefinition = "TEXT")
    private String projectName;
}
