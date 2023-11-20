package com.beit.aquint.common.dto;

import lombok.Data;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 31/10/23  11:03 pm
 */
@Data
public class PaginationRequestDto {
    private Integer page;
    private Integer size;
    private String sortBy;
    private Boolean orderBy;
    private String searchBy;
}
