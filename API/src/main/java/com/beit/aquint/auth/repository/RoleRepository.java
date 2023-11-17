package com.beit.aquint.auth.repository;

import com.beit.aquint.auth.models.ERole;
import com.beit.aquint.auth.models.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);

    @Query(value = "from Role r WHERE Lower(r.name) LIKE Lower(CONCAT( '%', :search, '%'))")
    Page<Role> findRolePageWithSearch(Pageable pageable,
                                      @Param("search") String search);
}
