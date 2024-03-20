package com.beit.aquint.master.vendor.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.vendor.entity.Vendor;
import com.beit.aquint.project.product.productprocess.entity.Products;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VendorService{

    public ResponseMessage addNewVendor(Vendor vendor) throws AquintCommonException;

    public List<Vendor> getAllVendor() throws AquintCommonException;

    public Vendor getVendorByID(Long id) throws AquintCommonException;

    public Page<Vendor> getVendorPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;



}
