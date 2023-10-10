package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

/**
 * <h1> User Details </h1>
 * <p>
 * User Details Table Info Table To Store User Data
 * </p>
 *
 * @author - jaykalariya
 * @since - 09/10/23  9:36 pm
 */
@Entity
@Table(name = "user_detail")
@Data
public class UserDetail extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;

    @Size(max = 15)
    private String firstname;

    @Size(max = 15)
    private String middlename;

    @Size(max = 15)
    private String lastname;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 10)
    @Email
    private String mobileNumber;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    private String gender;

    private String bloodGroup;

    private String maritalStatus;

    @Temporal(TemporalType.DATE)
    private Date anniversaryDate;

    private String nationality;

    private String religion;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String imageUrl;
}
