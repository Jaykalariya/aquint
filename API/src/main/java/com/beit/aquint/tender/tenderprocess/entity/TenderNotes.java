package com.beit.aquint.tender.tenderprocess.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "tender_notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenderNotes extends EntityAuditInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "tender_id")
    private Long tenderId;

    @NotNull
    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "url")
    private String url;
}
