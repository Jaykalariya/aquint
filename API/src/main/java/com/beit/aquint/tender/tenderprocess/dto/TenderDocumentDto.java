package com.beit.aquint.tender.tenderprocess.dto;

import java.util.Date;

public interface TenderDocumentDto {
    public Date getCreatedOn();
    public String getCreatedBy();
    public String getProfileUrl();
    public String getDocumentUrl();
    public String getDocumentName();
    public String getExtension();
}
