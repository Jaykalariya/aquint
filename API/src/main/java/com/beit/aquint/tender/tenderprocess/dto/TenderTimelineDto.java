package com.beit.aquint.tender.tenderprocess.dto;

import java.util.Date;

public interface TenderTimelineDto {
    public Date getCreatedOn();
    public String getStage();
    public String getType();
    public String getCreatedBy();
    public String getProfileUrl();

}
