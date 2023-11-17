package com.beit.aquint.customer.division.entity;

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
 * @since - 17/11/23  1:52 pm
 */
@Entity
@Table(name = "division")
@Data
public class Division extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "division_name", columnDefinition = "TEXT")
    private String divisionName;

    private Boolean status;
}
