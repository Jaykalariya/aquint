package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.TrainingDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface TrainingDetailsService {

    public TrainingDetails addTrainingDetails(TrainingDetails trainingDetails) throws AquintCommonException;

    public Optional<TrainingDetails> getTrainingDetails(Long userId);

    public TrainingDetails updateTrainingDetails(Long userId, TrainingDetails trainingDetails);
    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException;
}
