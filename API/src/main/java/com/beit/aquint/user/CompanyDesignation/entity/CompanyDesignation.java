package com.beit.aquint.user.CompanyDesignation.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "company_designation")
@Data
public class CompanyDesignation extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "company_designation_name")
    private String companyDesignationName;

    @NotNull
    @Column(name = "company_designation_description", columnDefinition = "TEXT")
    private String companyDesignationDescription;

    @NotNull
    private Boolean status;
}
