package com.beit.aquint.project.product.producttype.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;


@Entity
@Table(name = "product_type")
@Data
public class ProductType extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "project_id")
    private Long projectId;

    @NotBlank
    @Column(name = "product_type_name")
    private String productTypeName;

    @NotBlank
    @Column(name = "code")
    private String code;
}
