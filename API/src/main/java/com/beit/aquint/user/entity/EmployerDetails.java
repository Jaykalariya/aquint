package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employer_details")
public class EmployerDetails extends EntityAuditInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    private Long designation;

    @NotNull
    private Long department;

    @NotNull
    private Long ctc;

    @NotNull
    private Date dateOfJoining;

    @NotBlank
    @Column(name="pf_details")
    private String pfDetails;

    @NotBlank
    @Column(name="esic_details")
    private String esicDetails;

}
