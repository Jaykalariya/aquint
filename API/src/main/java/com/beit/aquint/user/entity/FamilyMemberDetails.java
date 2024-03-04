package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family_member_details")
public class FamilyMemberDetails extends EntityAuditInfo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    private String familyMemberName;

    @NotBlank
    private String occupation;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Size(max = 10 , min=10)
    private String mobileNumber;

    @Column(name="relation")
    private String relation;

}
