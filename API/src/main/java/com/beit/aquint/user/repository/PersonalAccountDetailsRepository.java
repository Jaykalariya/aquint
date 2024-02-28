package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.PersonalAccountDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalAccountDetailsRepository extends JpaRepository<PersonalAccountDetails, Long> {
    Optional<PersonalAccountDetails> findByUserId(Long userId);

    Boolean existsByUserId(Long userId);
}
