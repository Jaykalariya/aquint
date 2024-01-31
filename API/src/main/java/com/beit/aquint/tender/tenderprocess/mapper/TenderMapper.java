package com.beit.aquint.tender.tenderprocess.mapper;

import com.beit.aquint.tender.tenderprocess.dto.TenderAddRequestDto;
import com.beit.aquint.tender.tenderprocess.entity.TenderAssignedUsers;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  4:06 pm
 */
public class TenderMapper {

    private TenderMapper() {
    }

    public static TenderDetails getTenderDetails(TenderAddRequestDto tenderAddRequestDto) {
        TenderDetails details = new TenderDetails();

        details.setId(tenderAddRequestDto.getId());
        details.setProjectName(tenderAddRequestDto.getProjectName());
        details.setProjectDisplayName(tenderAddRequestDto.getProjectDisplayName());
        details.setTenderType(tenderAddRequestDto.getTenderType());
        details.setTenderStage(tenderAddRequestDto.getTenderStage());
        details.setTenderEmds(tenderAddRequestDto.getTenderEmds());
        details.setEmd(tenderAddRequestDto.getEmds());
        details.setProjectValue(tenderAddRequestDto.getProjectValue());
        details.setSubmissionDate(tenderAddRequestDto.getSubmissionDate());
        details.setLocation(tenderAddRequestDto.getLocation());
        return details;
    }

    public static TenderAssignedUsers getTenderAssignedUsers(Long tenderId, Long userId) {
        TenderAssignedUsers tenderAssignedUsers = new TenderAssignedUsers();

        tenderAssignedUsers.setTenderId(tenderId);
        tenderAssignedUsers.setUserId(userId);

        return tenderAssignedUsers;
    }
}
