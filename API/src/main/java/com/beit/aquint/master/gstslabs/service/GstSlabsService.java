package com.beit.aquint.master.gstslabs.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.master.gstslabs.entity.GstSlabs;
import org.springframework.data.domain.Page;

import java.util.List;


public interface GstSlabsService {

    public ResponseMessage addNewGstSlabs(GstSlabs gstSlabs) throws AquintCommonException;

    public List<GstSlabs> getAllGstSlabs() throws AquintCommonException;

    public Page<GstSlabs> getGstSlabsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

}
