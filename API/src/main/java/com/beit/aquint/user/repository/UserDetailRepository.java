package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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


}
