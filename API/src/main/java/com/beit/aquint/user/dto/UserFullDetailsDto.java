package com.beit.aquint.user.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFullDetailsDto {
    private Long id;
    private String email;
    private String userName;
    private String firstname;
    private String middlename;
    private String lastname;
    private String roles;
    private String imageUrl;
}
