package com.beit.aquint.tender.tendertype.entity;

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
 * @since - 20/11/23  11:25 pm
 */
@Entity
@Table(name = "tender_type")
@Data
public class TenderType extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "tender_stage_name")
    private String tenderTypeName;

    private Boolean status;
}
