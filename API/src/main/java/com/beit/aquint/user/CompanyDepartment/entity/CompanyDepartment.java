package com.beit.aquint.user.CompanyDepartment.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "company_department")
@Data
public class CompanyDepartment extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "company_department_name" )
    private String companyDepartmentName;

    @NotNull
    @Column(name = "company_department_description",columnDefinition = "TEXT")
    private String companyDepartmentDescription;

    @NotNull
    private Boolean status;
}
