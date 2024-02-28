package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.PersonalAccountDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface PersonalAccountDetailsService {

    public PersonalAccountDetails addPersonalAccountDetails(PersonalAccountDetails personalAccountDetails) throws AquintCommonException;

    public Optional<PersonalAccountDetails> getPersonalAccountDetails(Long userId);

    public PersonalAccountDetails updatePersonalAccountDetails(Long userId, PersonalAccountDetails personalAccountDetails);
    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException;
}
