package com.beit.aquint.master.gstslabs.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.gstslabs.entity.GstSlabs;
import com.beit.aquint.master.gstslabs.repository.GstSlabsRepository;
import com.beit.aquint.master.gstslabs.service.GstSlabsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@Slf4j
public class GstSlabsServiceImpl implements GstSlabsService {

    @Autowired
    GstSlabsRepository gstSlabsRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public ResponseMessage addNewGstSlabs(GstSlabs gstSlabs) throws AquintCommonException {
        try {
            log.debug("Gst Slab Saving");
            return new ResponseMessage("Gst Slab saved/updated successfully", gstSlabsRepository.save(gstSlabs));
        } catch (Exception exception) {
            throw new AquintCommonException("Gst Slab Not Saved Properly");
        }
    }

    @Override
    public List<GstSlabs> getAllGstSlabs() throws AquintCommonException {
        try {
            log.debug("Gst Slabs Getting");
            return gstSlabsRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Gst Slab Not Fetch Properly");
        }
    }

    @Override
    public Page<GstSlabs> getGstSlabsPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return gstSlabsRepository.findGstSlabsPageWithoutSearch(pageable);
            } else {
                return gstSlabsRepository.findGstSlabsPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("GstSlabs Not fetch Properly");
        }
    }


}
