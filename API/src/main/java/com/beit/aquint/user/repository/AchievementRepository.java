package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    Optional<Achievement> findByUserId(Long userId);

    Boolean existsByUserId(Long userId);
}
