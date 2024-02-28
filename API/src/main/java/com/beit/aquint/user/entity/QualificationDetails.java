package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "qualification_details")
public class QualificationDetails extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    @Size(max = 100)
    private String qualificationName;

    @NotBlank
    @Size(max = 100)
    private String universityName;

    @NotBlank
    @Size(max = 100)
    private String subject;

    @NotNull
    @Min(value = 1900, message = "Year must be at least 1900")
    private Integer passingYear;

    @NotNull
    @DecimalMin(value = "0.00", inclusive = false, message = "Percentage must be greater than 0")
    @DecimalMax(value = "100.00", inclusive = true, message = "Percentage must be less than or equal to 100")
    private BigDecimal percentage;

    @Size(max = 255)
    private String qualificationDocumentUrl;

    public QualificationDetails(Long userId, String qualificationName, String universityName, String subject, Integer passingYear, BigDecimal percentage, String qualificationDocumentUrl) {
        this.userId = userId;
        this.qualificationName = qualificationName;
        this.universityName = universityName;
        this.subject = subject;
        this.passingYear = passingYear;
        this.percentage = percentage;
        this.qualificationDocumentUrl=qualificationDocumentUrl;
    }
}
