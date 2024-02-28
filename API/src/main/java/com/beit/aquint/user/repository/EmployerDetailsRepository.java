package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.EmployerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployerDetailsRepository  extends JpaRepository<EmployerDetails, Long> {
    Optional<EmployerDetails> findByUserId(Long userId);

    Boolean existsByUserId(Long userId);
}
