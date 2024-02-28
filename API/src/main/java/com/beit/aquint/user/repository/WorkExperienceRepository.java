package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {

    Optional<WorkExperience> findByUserId(Long userId);

}
