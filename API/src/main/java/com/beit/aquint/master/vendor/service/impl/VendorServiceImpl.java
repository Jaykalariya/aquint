package com.beit.aquint.master.vendor.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.master.vendor.entity.Vendor;
import com.beit.aquint.master.vendor.repository.VendorRepository;
import com.beit.aquint.master.vendor.service.VendorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class VendorServiceImpl implements VendorService {

    @Autowired
    VendorRepository vendorRepository;

    @Override
    public ResponseMessage addNewVendor(Vendor vendor) throws AquintCommonException {
        try {
            return new ResponseMessage("Vendor saved/updated successfully", vendorRepository.save(vendor));
        } catch (Exception exception) {
            throw new AquintCommonException("Vendor Not Saved Properly");
        }
    }

    @Override
    public List<Vendor> getAllVendor() throws AquintCommonException {
        try {
            return vendorRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("vendor Not Saved Properly");
        }    }

    @Override
    public Vendor getVendorByID(Long id) throws AquintCommonException {
        try {
            return vendorRepository.findVendorById(id);
        } catch (Exception exception) {
            throw new AquintCommonException("Vendor Not fetched Properly");
        }     }
}
