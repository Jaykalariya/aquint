package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.TrainingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainingDetailsRepository extends JpaRepository<TrainingDetails, Long> {
    Optional<TrainingDetails> findByUserId(Long userId);

    Boolean existsByUserId(Long userId);
}
