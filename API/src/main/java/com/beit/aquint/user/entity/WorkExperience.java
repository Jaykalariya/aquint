package com.beit.aquint.user.entity;


import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@EqualsAndHashCode()
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "work_experience")
public class WorkExperience extends EntityAuditInfo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    @Size(max = 100)
    private String companyName;

    @NotBlank
    @Size(max = 50)
    private String designation;

    @Temporal(TemporalType.DATE)
    @Past(message = "Start date must be in the past")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @NotNull
    @Digits(integer = 15, fraction = 2, message = "Gross salary must be a valid numeric value with up to 15 digits in total, and up to 2 digits after the decimal point")
    private BigDecimal grossSalary;

    @Size(max = 255)
    private String supporitngDocumentUrl;

    // Add other fields as needed

    public WorkExperience(Long userId, String companyName, String designation, Date startDate, Date endDate, BigDecimal grossSalary, String experienceLetterUrl) {
        this.userId = userId;
        this.companyName = companyName;
        this.designation = designation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.grossSalary = grossSalary;
        this.supporitngDocumentUrl = supporitngDocumentUrl;
    }
}
