package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.QualificationDetails;
import com.beit.aquint.user.repository.QualificationDetailsRepository;
import com.beit.aquint.user.service.QualificationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class QualificationDetailsServiceImpl implements QualificationDetailsService {

    @Autowired
    private QualificationDetailsRepository qualificationDetailsRepository;

    @Autowired
    FileUploadService fileUploadService;


    @Override
    public QualificationDetails addQualificationDetails(QualificationDetails qualificationDetails) {
        return qualificationDetailsRepository.save(qualificationDetails);
    }

    @Override
    public Optional<QualificationDetails> getUserQualificationDetail(Long userId) {
        try {
            return qualificationDetailsRepository.findByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users personal account details", exception);
        }
    }

    @Override
    public List<QualificationDetails> getAllUserQualificationDetails() {
        return qualificationDetailsRepository.findAll();
    }

    @Override
    public QualificationDetails updateQualificationDetails(Long userId, QualificationDetails updatedQualificationDetails) {
        QualificationDetails existingQualificationDetails = qualificationDetailsRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Qualification details not found with id: " + userId));
        // Update the existing qualification details with the new data
        existingQualificationDetails.setQualificationName(updatedQualificationDetails.getQualificationName());
        existingQualificationDetails.setUniversityName(updatedQualificationDetails.getUniversityName());
        existingQualificationDetails.setSubject(updatedQualificationDetails.getSubject());
        existingQualificationDetails.setPassingYear(updatedQualificationDetails.getPassingYear());
        existingQualificationDetails.setPercentage(updatedQualificationDetails.getPercentage());
        existingQualificationDetails.setQualificationDocumentUrl(updatedQualificationDetails.getQualificationDocumentUrl());
        // Update other fields as needed
        return qualificationDetailsRepository.save(existingQualificationDetails);
    }

    @Override
    public String uploadQualificationDocument(MultipartFile multipartFile) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_IMAGE;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);    }



    // Implement other methods if needed
}
