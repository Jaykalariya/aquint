package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderprocess.dto.TenderDocumentDto;
import com.beit.aquint.tender.tenderprocess.dto.TenderTimelineDto;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import com.beit.aquint.tender.tenderprocess.entity.TenderDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenderDocumentsRepository extends JpaRepository<TenderDocuments, Long> {
    @Query(value = Constant.Query.DOCUMENTS_BY_TENDER_ID ,nativeQuery = true)
    List<TenderDocumentDto> getAllDocumentByTenderId(@Param("tenderId") Long tenderId);
}
