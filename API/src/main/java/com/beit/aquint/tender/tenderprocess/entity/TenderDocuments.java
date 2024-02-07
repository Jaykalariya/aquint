package com.beit.aquint.tender.tenderprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "tender_documents")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TenderDocuments extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "tender_id")
    private Long tenderId;

    @NotNull
    @Column(name = "document_name")
    private String documentName;

    @NotNull
    @Column(name = "document_url")
    private String documentUrl;

    @NotNull
    @Column(name = "extension")
    private String extension;

    public TenderDocuments(Long tenderId, String documentName, String documentUrl, String extension) {
        this.tenderId = tenderId;
        this.documentName = documentName;
        this.documentUrl = documentUrl;
        this.extension = extension;
    }
}
