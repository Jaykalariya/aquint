package com.beit.aquint.project.projectprocess.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

@Data
public class ProjectCardDto {

    private Long id;
    private BigInteger createdBy;
    private Date createdOn;
    private Long modifiedBy;
    private Date modifiedOn;
    private String projectCustomId;
    private Long tenderId;
    private String projectDisplayName;
    private Integer initialStepsStatus;
    private Integer progress;
    private BigInteger stepId;
    private BigInteger completedStepLength;
    private String projectname;


}
