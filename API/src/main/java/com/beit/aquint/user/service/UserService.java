package com.beit.aquint.user.service;

import com.beit.aquint.auth.payload.request.SignupRequest;
import com.beit.aquint.auth.payload.response.MessageResponse;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.user.dto.UserFullDetail;
import com.beit.aquint.user.dto.UserFullDetailsDto;
import com.beit.aquint.user.dto.reponse.SignupResponse;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.auth.models.User;
import com.beit.aquint.user.dto.UserBasicInfoDTO;
import com.beit.aquint.user.entity.UserDetail;
import org.springframework.data.domain.Page;
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

    public UserDetail updateUserProfileBasicDetails(Long userId, UserDetail userDetail);

    public UserDetail addUserProfileBasicDetails(UserDetail userDetail);

    public String uploadProfilePhoto(MultipartFile multipartFile) throws IOException;

    public UserDetail getUserDetail(Long userId);

    public SignupResponse addUser(SignupRequest user);

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);

    public UserFullDetail getUserFullDetail(Long userId);

    public List<UserFullDetail> getAllUserFullDetail();

    public Page<UserFullDetail> getUserPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;
    public List<UserBasicInfoDTO> getAllUserDetails();

    public UserDetail getCurrentUserDetails();

    public User getCurrentUserPrivateInfo();

    public MessageResponse changeUserStatus(UserFullDetailsDto userFullDetailsDto);
}
