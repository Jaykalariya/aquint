package com.beit.aquint.user.service;

import com.beit.aquint.user.dto.UserFullDetail;
import com.beit.aquint.user.entity.QualificationDetails;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.entity.WorkExperience;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface WorkExperienceService {

    public WorkExperience addWorkExperience(WorkExperience workExperience);

    public List<WorkExperience> getUserWorkExperienceDetail(Long userId);

    public List<WorkExperience> getAllUserExperienceDetails();

    public WorkExperience updateWorkExperience(Long workExperienceId, WorkExperience workExperience);

    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException;


}
