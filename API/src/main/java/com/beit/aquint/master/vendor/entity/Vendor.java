package com.beit.aquint.master.vendor.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "vendor")
@Data
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Company name is required")
    @Column(name = "company_name")
    private String companyName;

    @Column(name = "display_name")
    private String displayName;

    @NotBlank(message = "Company email is required")
    @Email(message = "Invalid email format")
    @Column(name = "company_email")
    private String companyEmail;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message = "Mobile number must be 10 digits")
    @Column(name = "mobile_number")
    private String mobileNumber;

    @NotBlank(message = "Contact person's first name is required")
    @Column(name = "contact_person_first_name")
    private String contactPersonFirstName;

    @Column(name = "contact_person_middle_name")
    private String contactPersonMiddleName;

    @Column(name = "contact_person_last_name")
    private String contactPersonLastName;

    @NotBlank(message = "Contact person's email is required")
    @Email(message = "Invalid email format")
    @Column(name = "contact_person_email")
    private String contactPersonEmail;

    @NotBlank(message = "Contact person's mobile number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message = "Mobile number must be 10 digits")
    @Column(name = "contact_person_mobile_number")
    private String contactPersonMobileNumber;

    @NotNull
    @Max(value = 9999999999999999L, message = "Account number must be less than or equal to 9999999999999999")
    @Column(name = "account_number")
    private Long accountNumber;

    @NotBlank(message = "IFSC code is required")
    @Size(max = 15)
    @Column(name = "ifsc_code")
    private String ifscCode;

    @NotBlank(message = "Bank name is required")
    @Column(name = "bank_name")
    private String bankName;

    @NotBlank(message = "Account holder name is required")
    @Column(name = "account_holder_name")
    private String accountHolderName;

}
