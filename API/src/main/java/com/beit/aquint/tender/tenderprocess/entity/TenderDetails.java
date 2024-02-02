package com.beit.aquint.tender.tenderprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:44 pm
 */
@Entity
@Table(name = "tender_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TenderDetails extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long tenderType;

    private Long tenderStage;

    @Column(columnDefinition = "TEXT")
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String projectDisplayName;

    private Double projectValue;

    private Date submissionDate;

    private String tenderEmds;

    private Double emd;

    private String location;

}
