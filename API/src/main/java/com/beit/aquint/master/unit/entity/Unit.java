package com.beit.aquint.master.unit.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "unit", uniqueConstraints = {
        @UniqueConstraint(columnNames = "unit_name")
})
@Data
public class Unit extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "unit_name")
    private String unitName;

    @NotBlank
    @Column(name = "unit_type")
    private String unitType;
    
}
