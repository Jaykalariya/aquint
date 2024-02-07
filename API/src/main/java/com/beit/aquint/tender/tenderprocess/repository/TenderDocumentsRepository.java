package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import com.beit.aquint.tender.tenderprocess.entity.TenderDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenderDocumentsRepository extends JpaRepository<TenderDocuments, Long> {
}
