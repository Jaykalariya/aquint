package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderprocess.dto.TenderNotesDto;
import com.beit.aquint.tender.tenderprocess.dto.TenderTimelineDto;
import com.beit.aquint.tender.tenderprocess.entity.TenderNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenderNotesRepository extends JpaRepository<TenderNotes, Long> {
    @Query(value = Constant.Query.TENDER_NOTES_BY_TENDER_ID ,nativeQuery = true)
    List<TenderNotesDto> tenderNotesByTenderId(@Param("tenderId") Long tenderId);
}
