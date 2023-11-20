package com.beit.aquint.customer.division.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.customer.division.entity.Division;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 17/11/23  1:51 pm
 */
public interface DivisionService {

    public Division addNewDivision(Division division) throws AquintCommonException;

    public List<Division> getAllDivision() throws AquintCommonException;

    public Page<Division> getDivisionPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException;

}
