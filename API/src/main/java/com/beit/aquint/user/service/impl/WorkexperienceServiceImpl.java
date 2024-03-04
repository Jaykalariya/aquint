package com.beit.aquint.user.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.QualificationDetails;
import com.beit.aquint.user.entity.WorkExperience;
import com.beit.aquint.user.repository.WorkExperienceRepository;
import com.beit.aquint.user.service.WorkExperienceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class WorkexperienceServiceImpl implements WorkExperienceService {

    @Autowired
    private final WorkExperienceRepository workExperienceRepository;
    @Autowired
    FileUploadService fileUploadService;


    public WorkexperienceServiceImpl(WorkExperienceRepository workExperienceRepository) {
        this.workExperienceRepository = workExperienceRepository;
    }

    @Override
    public WorkExperience addWorkExperience(WorkExperience workExperience) {
        return workExperienceRepository.save(workExperience);
    }

    @Override
    public List<WorkExperience> getUserWorkExperienceDetail(Long userId) {
        try {
            return workExperienceRepository.findAllByUserId(userId);
        }
        catch (Exception exception) {
            throw new RuntimeException("Error retrieving users work experience details", exception);
        }
    }

    @Override
    public List<WorkExperience> getAllUserExperienceDetails() {
        return workExperienceRepository.findAll();
    }

    @Override
    public WorkExperience updateWorkExperience(Long workExperienceId, WorkExperience workExperience){
        WorkExperience existingWorkExperience = workExperienceRepository.findById(workExperienceId)
                .orElseThrow(() -> new NotFoundException("Work experience details not found with id: " + workExperienceId));
            existingWorkExperience.setCompanyName(workExperience.getCompanyName());
            existingWorkExperience.setDesignation(workExperience.getDesignation());
            existingWorkExperience.setStartDate(workExperience.getStartDate());
            existingWorkExperience.setEndDate(workExperience.getEndDate());
            existingWorkExperience.setGrossSalary(workExperience.getGrossSalary());
            existingWorkExperience.setSupporitngDocumentUrl(workExperience.getSupporitngDocumentUrl());
            return workExperienceRepository.save(existingWorkExperience);

    }

    @Override
    public String uploadDocument(MultipartFile multipartFile, Long userId) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_FILES + "/" + userId + "/" + Constant.File.WORK_EXPERIENCE;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }
}