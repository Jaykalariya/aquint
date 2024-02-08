package com.beit.aquint.user.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@Data
@AllArgsConstructor
public class SignupResponse {

    private String message;

    private String username;

    private String email;

    private String password;

}
