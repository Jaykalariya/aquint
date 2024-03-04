package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.PersonalAccountDetails;
import com.beit.aquint.user.repository.PersonalAccountDetailsRepository;
import com.beit.aquint.user.service.PersonalAccountDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class PersonalAccountDetailsServiceImpl implements PersonalAccountDetailsService {
    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    PersonalAccountDetailsRepository personalAccountDetailsRepository;

    @Override
    public Optional<PersonalAccountDetails> getPersonalAccountDetails(Long userId){
        try {
            return personalAccountDetailsRepository.findByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users personal account details", exception);
        }
    }

    @Override
    public PersonalAccountDetails addPersonalAccountDetails(PersonalAccountDetails personalAccountDetails) throws AquintCommonException{
        try {
            if(!personalAccountDetailsRepository.existsByUserId(personalAccountDetails.getUserId())){
            return personalAccountDetailsRepository.save(personalAccountDetails);
            }
            throw new AquintCommonException("UserId exists");

        } catch (Exception e) {
            throw new AquintCommonException("Error - "+e);
        }
    }

    @Override
    public PersonalAccountDetails updatePersonalAccountDetails(Long userId, PersonalAccountDetails personalAccountDetails) {
        try {
            PersonalAccountDetails existingPersonalAccountDetails = personalAccountDetailsRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException("user id Not found"));
            PersonalAccountDetails updatedPersonalAccountDetails = existingPersonalAccountDetails.builder()
                    .id(existingPersonalAccountDetails.getId())
                    .userId(existingPersonalAccountDetails.getUserId())
                    .aadhaarNumber(personalAccountDetails.getAadhaarNumber())
                    .panNumber(personalAccountDetails.getPanNumber())
                    .accountNumber(personalAccountDetails.getAccountNumber())
                    .accountHolderName(personalAccountDetails.getAccountHolderName())
                    .bankName(personalAccountDetails.getBankName())
                    .ifsc(personalAccountDetails.getIfsc())
                    .drivingLicenceNumber(personalAccountDetails.getDrivingLicenceNumber())
                    .aadhaarUrl(personalAccountDetails.getAadhaarUrl())
                    .panUrl(personalAccountDetails.getPanUrl())
                    .accountStatementUrl(personalAccountDetails.getAccountStatementUrl())
                    .drivingLicenceUrl(personalAccountDetails.getDrivingLicenceUrl())
                    .build();

            return personalAccountDetailsRepository.save(updatedPersonalAccountDetails);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating users personal account details", exception);
        }
    }


    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_FILES + "/" + userId + "/" + Constant.File.PERSONAL_ACCOUNT_DETAILS;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }


//    @Override
//    @Transactional
//    public ResponseMessage addPersonalAccountDetails(MultipartFile aadhaar, MultipartFile pan, MultipartFile drivingLicence, MultipartFile accountStatement, PersonalAccountDetailsDto personalAccountDetailsDto) throws AquintCommonException{
//        PersonalAccountDetails personalAccountDetails = new PersonalAccountDetails();
//        personalAccountDetails.setUserId(personalAccountDetailsDto.getUserId());
//        personalAccountDetails.setAadhaarNumber(personalAccountDetailsDto.getAadhaarNumber());
//        personalAccountDetails.setPanNumber(personalAccountDetailsDto.getPanNumber());
//        personalAccountDetails.setBankName(personalAccountDetailsDto.getBankName());
//        personalAccountDetails.setAccountHolderName(personalAccountDetailsDto.getAccountHolderName());
//        personalAccountDetails.setAccountNumber(personalAccountDetailsDto.getAccountNumber());
//        personalAccountDetails.setIfsc(personalAccountDetailsDto.getIfsc());
//        personalAccountDetails.setDrivingLicenceNumber(personalAccountDetailsDto.getDrivingLicenceNumber());
//
//        try {
//            personalAccountDetails.setAadhaarUrl(uploadDocument(aadhaar, personalAccountDetailsDto.getUserId()));
//            personalAccountDetails.setPanUrl(uploadDocument(pan, personalAccountDetailsDto.getUserId()));
//            personalAccountDetails.setDrivingLicenceUrl(uploadDocument(drivingLicence, personalAccountDetailsDto.getUserId()));
//            personalAccountDetails.setAccountStatementUrl(uploadDocument(accountStatement, personalAccountDetailsDto.getUserId()));
//            personalAccountDetailsRepository.save(personalAccountDetails);
//            return new ResponseMessage("User personal account details saved properly",personalAccountDetails);
//        } catch (IOException e) {
//            throw new AquintCommonException("Error");
//        }
//    }
}
