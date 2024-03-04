package com.beit.aquint.master.gstslabs.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "gst_slabs")
@Data
public class GstSlabs extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "total_percentage")
    private Double totalPercentage;

    @NotNull
    @Column(name = "sgst_percentage")
    private Double sgstPercentage;

    @NotNull
    @Column(name = "cgst_percentage")
    private Double cgstPercentage;

    @NotNull
    @Column(name = "igst_percentage")
    private Double igstPercentage;

}
