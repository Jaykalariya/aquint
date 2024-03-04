package com.beit.aquint.user.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.user.entity.Achievement;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AchievementService {

    public Achievement addAchievement(Achievement achievement) throws AquintCommonException;

    public List<Achievement> getAchievement(Long userId);

    public Achievement updateAchievement(Long achievementId, Achievement achievement);
    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException;
}
