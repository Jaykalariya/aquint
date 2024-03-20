package com.beit.aquint.master.vendor.repository;

import com.beit.aquint.master.vendor.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    Vendor findVendorById( Long id);

    @Query(value = "from Vendor v WHERE " +
            "Lower(v.firstName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.middleName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.lastName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.companyName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.displayName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.companyEmail) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.contactPersonFirstName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.contactPersonMiddleName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.contactPersonLastName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.contactPersonEmail) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.bankName) LIKE Lower(CONCAT('%', :search, '%')) OR " +
            "Lower(v.accountHolderName) LIKE Lower(CONCAT('%', :search, '%'))"
    )
    Page<Vendor> findVendorsPageWithSearch(Pageable pageable,
                                              @Param("search") String search);

    @Query(value = "from Vendor v")
    Page<Vendor> findVendorsPageWithoutSearch(Pageable pageable);

}
