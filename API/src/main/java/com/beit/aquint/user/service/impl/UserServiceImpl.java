package com.beit.aquint.user.service.impl;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.repository.UserDetailRepository;
import com.beit.aquint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 09/10/23  9:35 pm
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    FileUploadService fileUploadService;

    @Override
    public UserDetail addUserProfileBasicDetails(UserDetail userDetail) {
        return userDetailRepository.save(userDetail);
    }

    @Override
    public String uploadProfilePhoto(MultipartFile multipartFile) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_IMAGE;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }
}
