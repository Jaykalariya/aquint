package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.QualificationDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QualificationDetailsRepository extends JpaRepository<QualificationDetails, Long> {

    Optional<QualificationDetails> findByUserId(Long userId);

}
