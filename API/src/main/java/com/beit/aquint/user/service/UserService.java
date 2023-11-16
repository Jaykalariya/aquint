package com.beit.aquint.user.service;

import com.beit.aquint.user.entity.UserDetail;
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
public interface UserService {

    public UserDetail addUserProfileBasicDetails(UserDetail userDetail);

    public String uploadProfilePhoto(MultipartFile multipartFile) throws IOException;
}
