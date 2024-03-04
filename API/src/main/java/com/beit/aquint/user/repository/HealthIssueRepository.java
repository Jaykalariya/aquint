package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.HealthIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HealthIssueRepository extends JpaRepository<HealthIssue, Long> {
    Optional<HealthIssue> findByUserId(Long userId);

    Boolean existsByUserId(Long userId);

    List<HealthIssue> findAllByUserId(Long userId);
}
