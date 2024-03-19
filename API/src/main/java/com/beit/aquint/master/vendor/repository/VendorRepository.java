package com.beit.aquint.master.vendor.repository;

import com.beit.aquint.master.vendor.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    Vendor findVendorById( Long id);

}
