package com.beit.aquint.user.service.impl;

import com.beit.aquint.auth.models.Role;
import com.beit.aquint.auth.models.User;
import com.beit.aquint.auth.payload.request.SignupRequest;
import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.customer.department.entity.Department;
import com.beit.aquint.user.common.UserFullDetail;
import com.beit.aquint.user.dto.reponse.SignupResponse;
import com.beit.aquint.auth.repository.RoleRepository;
import com.beit.aquint.auth.repository.UserRepository;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.auth.models.User;
import com.beit.aquint.auth.repository.UserRepository;
import com.beit.aquint.auth.security.services.UserDetailsImpl;
import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.file.FileUploadService;
import com.beit.aquint.user.dto.UserFullDetailsDto;
import com.beit.aquint.user.dto.UserBasicInfoDTO;
import com.beit.aquint.user.entity.UserDetail;
import com.beit.aquint.user.repository.UserDetailRepository;
import com.beit.aquint.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    FileUploadService fileUploadService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PageUtilService pageUtilService;

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public SignupResponse addUser(SignupRequest signupRequest){

        String generatedPassword = "12345678";

        // Create new user's account
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(generatedPassword));

        Set<Integer> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            Role adminRole = roleRepository.findById(role.longValue()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
        });

        //save
        user.setRoles(roles);
        userRepository.save(user);
        Optional<User> userDetails = userRepository.findByUsername(user.getUsername());

        UserDetail userDetail = new UserDetail(userDetails.get().getId() ,signupRequest.getEmail(), signupRequest.getFirstName(), signupRequest.getMiddleName(), signupRequest.getLastName());
        userDetailRepository.save(userDetail);

        //signupResponse
        return new SignupResponse("User registered successfully!", userDetails.get().getUsername(), userDetails.get().getEmail(), generatedPassword);
    }

    @Override
    public UserDetail updateUserProfileBasicDetails(Long userId, UserDetail userDetail) {
        UserDetail existingUserDetail = userDetailRepository.findByUserId(userId);
        UserDetail updatedUserDetail = existingUserDetail.builder()
                .birthDate(userDetail.getBirthDate())
                .bloodGroup(userDetail.getBloodGroup())
                .anniversaryDate(userDetail.getAnniversaryDate())
                .firstName(userDetail.getFirstName())
                .middleName(userDetail.getMiddleName())
                .lastName(userDetail.getLastName())
                .gender(userDetail.getGender())
                .maritalStatus(userDetail.getMaritalStatus())
                .mobileNumber(userDetail.getMobileNumber())
                .nationality(userDetail.getNationality())
                .religion(userDetail.getReligion())
                .address(userDetail.getAddress())
                .imageUrl(userDetail.getImageUrl())
                .userId(existingUserDetail.getUserId())
                .email(existingUserDetail.getEmail())
                .id(existingUserDetail.getId())
                .build();
        return userDetailRepository.save(updatedUserDetail);
    }

    @Override
    public List<UserFullDetail> getAllUserFullDetail() {
        return userDetailRepository.getAllUserFullDetail();
    }

    @Override
    public UserFullDetail getUserFullDetail(Long userId) {
        return userDetailRepository.getUserFullDetail(userId);
    }

    @Override
    public Page<UserFullDetail> getUserPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return userDetailRepository.findUserPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return userDetailRepository.findUserPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Users throws exception");
        }
    }

    @Override
    public UserDetail addUserProfileBasicDetails(UserDetail userDetail) {
        return userDetailRepository.save(userDetail);
    }


    @Override
    public String uploadProfilePhoto(MultipartFile multipartFile) throws IOException {
        String userFolderPath = Constant.File.FILE_FOLDER_PATH_FOR_USER_IMAGE;
        return fileUploadService.uploadFile(multipartFile, userFolderPath);
    }

    @Override
    public UserDetail getUserDetail(Long userId) {
        UserDetail userDetail = userDetailRepository.findByUserId(userId);
        if (userDetail == null) {
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No data found for userId: " + userId);
        }
        return userDetail;
    }


    @Override
    public List<UserBasicInfoDTO> getAllUserDetails() {
        return userDetailRepository.findActiveUser();
    }

    @Override
    public UserDetail getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        return getUserDetail(userId);
    }

    @Override
    public User getCurrentUserPrivateInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        return userRepository.findById(userId).get();
    }
}
