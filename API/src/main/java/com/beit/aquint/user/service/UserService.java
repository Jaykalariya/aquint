package com.beit.aquint.user.service;

import com.beit.aquint.auth.models.User;
import com.beit.aquint.user.dto.UserBasicInfoDTO;
import com.beit.aquint.user.entity.UserDetail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    public UserDetail getUserDetail(Long userId);

    public List<UserBasicInfoDTO> getAllUserDetails();

    public UserDetail getCurrentUserDetails();

    public User getCurrentUserPrivateInfo();
}
