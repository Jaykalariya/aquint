package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

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

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_detail")
public class UserDetail extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    @Size(max = 50)
    private String firstname;

    @Size(max = 50)
    private String middlename;

    @NotBlank
    @Size(max = 50)
    private String lastname;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Size(max = 10)
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

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    public UserDetail(Long userId,String email, String firstname, String middlename, String lastname) {
        this.userId = userId;
        this.email = email;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
    }
}
