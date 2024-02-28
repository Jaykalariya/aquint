package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "personal_account_details")
public class PersonalAccountDetails extends EntityAuditInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    @Digits(integer = 12, fraction = 0, message = "Aadhaar number must have exactly 12 digits")
    private Long aadhaarNumber;


    @NotBlank
    @Size(min = 10, max = 10, message = "PAN number must have exactly 10 characters")
    private String panNumber;

    @NotBlank
    @Size(max = 50)
    private String bankName;

    @NotBlank
    @Size(max = 50)
    private String accountHolderName;

    @NotNull
    @Max(value = 9999999999999999L, message = "Account number must be less than or equal to 9999999999999999")
    private Long accountNumber;

    @NotBlank
    @Size(max = 15)
    private String ifsc;

    @NotBlank
    @Size(max = 20)
    private String drivingLicenceNumber;

    @NotBlank
    private String aadhaarUrl;

    @NotBlank
    private String panUrl;

    @NotBlank
    private String accountStatementUrl;

    @NotBlank
    private String drivingLicenceUrl;
}
