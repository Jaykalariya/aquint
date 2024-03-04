package com.beit.aquint.user.repository;

import com.beit.aquint.user.entity.FamilyMemberDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyMemberDetailsRepository extends JpaRepository<FamilyMemberDetails, Long> {

    Boolean existsByUserId(Long userId);

    List<FamilyMemberDetails> findAllByUserId(Long userId);

}
