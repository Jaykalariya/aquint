package com.beit.aquint.project.product.productprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Products extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "project_id")
    private Long projectId;

    @NotNull
    @Column(name = "product_type_id")
    private Long productTypeId;

    @NotBlank
    @Column(name = "item_code")
    private String itemCode;

    @NotNull
    @Column(name = "item_quantity")
    private Double itemQuantity;

    @NotNull
    @Column(name = "unit_id")
    private Long unitId;

    @NotNull
    @Column(name = "unit_rate")
    private Double unitRate;

    @NotNull
    @Column(name = "basic_value")
    private Double basicValue;

    @NotBlank
    @Column(name = "escl_type")
    private String esclType;

    @NotNull
    @Column(name = "escl_percentage")
    private Double esclPercentage;

    @NotNull
    @Column(name = "gst_slabs_id")
    private Long gstSlabsId;

    @NotNull
    @Column(name = "amount")
    private Double amount;

    @Column(name = "with_gst")
    private Boolean withGst;

    @NotNull
    @Column(name = "bidding_unit")
    private Double biddingUnit;

//    @NotNull
    @Column(name = "product_description")
    private  String productDescription;
}
