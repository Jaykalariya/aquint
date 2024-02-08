package com.beit.aquint.tender.tenderprocess.dto;

import lombok.Data;

import java.util.Date;

public interface TenderNotesDto {
    public String getNote();
    public String getCreatedBy();
    public String getUserId();
    public String getProfileUrl();
    public Date getCreatedOn();
}
