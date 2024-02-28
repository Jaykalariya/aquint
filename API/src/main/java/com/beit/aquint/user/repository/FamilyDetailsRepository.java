package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.FamilyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyDetailsRepository extends JpaRepository<FamilyDetails, Long> {

    Optional<FamilyDetails> findByUserId(Long userId);

    // Add other query methods as needed

}
