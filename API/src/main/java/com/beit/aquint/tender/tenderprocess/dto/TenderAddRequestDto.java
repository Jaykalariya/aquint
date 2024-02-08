package com.beit.aquint.tender.tenderprocess.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:53 pm
 */
@Data
public class TenderAddRequestDto {
    private Long id;
    private String projectName;
    private String projectDisplayName;
    private Long tenderStage;
    private Long tenderType;
    private Double projectValue;
    private Date submissionDate;
    private String emdExemption;
    private String tenderFeeExemption;
    private Double emdAmount;
    private Double tenderFee;
    private String location;
    private List<Long> assignedUsers;
}
