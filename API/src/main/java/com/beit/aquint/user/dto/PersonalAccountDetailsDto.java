package com.beit.aquint.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalAccountDetailsDto {
    private Long userId;

    private Long aadhaarNumber;

    private String panNumber;

    private String bankName;

    private String accountHolderName;

    private Long accountNumber;

    private String ifsc;

    private String drivingLicenceNumber;
}
