package com.beit.aquint.user.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.Achievement;
import com.beit.aquint.user.repository.AchievementRepository;
import com.beit.aquint.user.service.AchievementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class AchievementServiceImpl implements AchievementService {
    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    AchievementRepository achievementRepository;

    @Override
    public Optional<Achievement> getAchievement(Long userId){
        try {
            return achievementRepository.findByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users achievement", exception);
        }
    }

    @Override
    public Achievement addAchievement(Achievement achievement) throws AquintCommonException{
        try {
            if(Boolean.FALSE.equals(achievementRepository.existsByUserId(achievement.getUserId()))){
            return achievementRepository.save(achievement);
            }
            throw new AquintCommonException("UserId exists");

        } catch (Exception e) {
            throw new AquintCommonException("Error - "+e);
        }
    }

    @Override
    public Achievement updateAchievement(Long userId, Achievement achievement) {
        try {
            Achievement existingAchievement = achievementRepository.findByUserId(userId).orElseThrow();
            Achievement updatedAchievement = existingAchievement.builder()
                    .id(existingAchievement.getId())
                    .userId(existingAchievement.getUserId())
                    .achievementName(achievement.getAchievementName())
                    .achievementDescription(achievement.getAchievementDescription())
                    .achievementUrl(achievement.getAchievementUrl())
                    .build();

            return achievementRepository.save(updatedAchievement);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error updating users achievement", exception);
        }
    }


    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_FILES + "/" + userId + "/" + Constant.File.ACHIEVEMENT;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }


}
