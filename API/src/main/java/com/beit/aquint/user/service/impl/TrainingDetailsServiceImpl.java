package com.beit.aquint.user.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.TrainingDetails;
import com.beit.aquint.user.repository.TrainingDetailsRepository;
import com.beit.aquint.user.service.TrainingDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class TrainingDetailsServiceImpl implements TrainingDetailsService {
    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    TrainingDetailsRepository trainingDetailsRepository;

    @Override
    public Optional<TrainingDetails> getTrainingDetails(Long userId){
        try {
            return trainingDetailsRepository.findByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users training details", exception);
        }
    }

    @Override
    public TrainingDetails addTrainingDetails(TrainingDetails trainingDetails) throws AquintCommonException{
        try {
            if(Boolean.FALSE.equals(trainingDetailsRepository.existsByUserId(trainingDetails.getUserId()))){
            return trainingDetailsRepository.save(trainingDetails);
            }
            throw new AquintCommonException("UserId exists");

        } catch (Exception e) {
            throw new AquintCommonException("Error - "+e);
        }
    }

    @Override
    public TrainingDetails updateTrainingDetails(Long userId, TrainingDetails trainingDetails) {
        try {
            TrainingDetails existingTrainingDetails = trainingDetailsRepository.findByUserId(userId).orElseThrow();
            TrainingDetails updatedTrainingDetails = existingTrainingDetails.builder()
                    .id(existingTrainingDetails.getId())
                    .userId(existingTrainingDetails.getUserId())
                    .trainingName(trainingDetails.getTrainingName())
                    .trainingDescription(trainingDetails.getTrainingDescription())
                    .trainingUrl(trainingDetails.getTrainingUrl())
                    .build();

            return trainingDetailsRepository.save(updatedTrainingDetails);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating users trainingDetails", exception);
        }
    }


    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_FILES + "/" + userId + "/" + Constant.File.TRAINING;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }


}
