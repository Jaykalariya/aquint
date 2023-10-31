package com.beit.aquint.common.service;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.common.dto.PaginationRequestDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 31/10/23  10:58 pm
 */
@Service
public class PageUtilService {

    public Pageable getPageable(PaginationRequestDto paginationRequestDto) {
        Integer page = paginationRequestDto.getPage();
        Integer size = Objects.isNull(paginationRequestDto.getSize()) ? Constant.Page.DEFAULT_PAGE_SIZE : paginationRequestDto.getSize();
        String sortBy = Objects.isNull(paginationRequestDto.getSortBy()) ? Constant.Page.DEFAULT_PAGE_SORT : paginationRequestDto.getSortBy();
        Boolean order = Objects.isNull(paginationRequestDto.getOrderBy()) ? Constant.Page.DEFAULT_PAGE_ORDER : paginationRequestDto.getOrderBy();

        if (page.equals(0)) {
            return PageRequest.of(page, size, (Boolean.TRUE.equals(order) ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending()));
        }
        return PageRequest.of(page - 1, size, (Boolean.TRUE.equals(order) ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending()));
    }
}
