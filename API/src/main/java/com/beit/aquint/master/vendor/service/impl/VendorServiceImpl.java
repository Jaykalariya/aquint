package com.beit.aquint.master.vendor.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.vendor.entity.Vendor;
import com.beit.aquint.master.vendor.repository.VendorRepository;
import com.beit.aquint.master.vendor.service.VendorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class VendorServiceImpl implements VendorService {

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    PageUtilService pageUtilService;

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

    @Override
    public Page<Vendor> getVendorPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return vendorRepository.findVendorsPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return vendorRepository.findVendorsPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Product Not fetch Properly");
        }
    }
}
