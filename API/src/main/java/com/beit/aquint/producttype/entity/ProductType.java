package com.beit.aquint.producttype.entity;

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
 * @since - 16/11/23  6:19 pm
 */
@Entity
@Table(name = "product_type")
@Data
public class ProductType extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Boolean status;
}
