package com.beit.aquint.master.projectinitialsteps.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "project_initial_steps")
@Data
public class ProjectInitialSteps extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "step_name")
    private String stepName;

    @NotNull
    @Column(name = "step_order")
    private Integer step_order;

    @NotNull
    @Column(name = "is_compulsory")
    private Boolean isCompulsory;

    @NotNull
    @Column(name = "is_able_to_add_product")
    private Boolean isAbleToAddProduct;

    @NotNull
    private Boolean status;
}
