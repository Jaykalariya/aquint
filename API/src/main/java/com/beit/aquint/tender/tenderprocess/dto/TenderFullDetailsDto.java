package com.beit.aquint.tender.tenderprocess.dto;

import lombok.Data;
import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface TenderFullDetailsDto {
    public Long getId();
    public String getProjectName();
    public String getProjectDisplayName();
    public String getTenderStage();
    public String getTenderStageColor();
    public Integer getTenderStageValue();

    public String getTenderType();
    public Double getProjectValue();
    public String getSubmissionDate();
    public String getEmdExemption();
    public String getTenderFeeExemption();
    public Double getEmdAmount();
    public Double getTenderFee();
    public String getLocation();
    public String getAssignedUser();
}
