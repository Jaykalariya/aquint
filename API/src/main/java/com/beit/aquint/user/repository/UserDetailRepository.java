package com.beit.aquint.user.repository;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.user.common.UserFullDetail;
import com.beit.aquint.user.dto.UserFullDetailsDto;
import com.beit.aquint.user.dto.UserBasicInfoDTO;
import com.beit.aquint.user.entity.UserDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 09/10/23  9:36 pm
 */
@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
    UserDetail findByUserId(Long userId);

    @Query(value = Constant.Query.ALL_USER_FULL_DETAIL, nativeQuery = true)
    List<UserFullDetail> getAllUserFullDetail();

    @Query(value = Constant.Query.USER_FULL_DETAIL, nativeQuery = true)
    UserFullDetail getUserFullDetail(@Param("userId") Long userId);

    @Query(value = Constant.Query.USER_PAGING_WITH_SEARCH,
            nativeQuery = true)
    Page<UserFullDetail> findUserPageWithSearch(Pageable pageable,
                                                @Param("search") String search);

    @Query(value = Constant.Query.USER_PAGING_WITHOUT_SEARCH,
            nativeQuery = true)
    Page<UserFullDetail> findUserPageWithoutSearch(Pageable pageable);
    public UserDetail findByEmail(String email);

    @Query(value = "select u.id as id, u.email as \"email\" , u.username as \"username\",\n" +
            "ud.firstname as \"firstname\", ud.lastname as \"lastname\",ud.image_url as \"profilePhoto\",\n" +
            "ud.firstname || coalesce(' ' || ud.middlename, '') || ' ' || ud.lastname as \"fullName\" \n" +
            "from users u \n" +
            "left join user_detail ud on u.id = ud.user_id;", nativeQuery = true)
    public List<UserBasicInfoDTO> findActiveUser();
}
