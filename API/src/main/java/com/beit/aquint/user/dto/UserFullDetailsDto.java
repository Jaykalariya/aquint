package com.beit.aquint.user.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFullDetailsDto {
    private Long id;
    private String email;
    private String userName;
    private String firstName;
    private String middleName;
    private String lastName;
    private String roles;
}
