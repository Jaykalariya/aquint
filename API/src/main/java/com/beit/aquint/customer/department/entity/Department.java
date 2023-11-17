package com.beit.aquint.customer.department.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 16/11/23  7:07 pm
 */
@Entity
@Table(name = "department")
@Data
public class Department extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "department_name", columnDefinition = "TEXT")
    private String departmentName;

    private Boolean status;
}
