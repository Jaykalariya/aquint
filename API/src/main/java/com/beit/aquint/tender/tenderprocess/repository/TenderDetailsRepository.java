package com.beit.aquint.tender.tenderprocess.repository;

import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 28/01/24  3:59 pm
 */
@Repository
public interface TenderDetailsRepository extends JpaRepository<TenderDetails, Long> {

    @Query(value = "select td.id, td.created_on as \"createdOn\", td.project_display_name as \"projectDisplayName\",\n" +
            "td.modified_on  as \"lastUpdatedOn\", td.tender_stage as \"tenderStage\", tt.tender_stage_name  as \"tenderType\", cast((\n" +
            "        SELECT \n" +
            "            jsonb_agg(json_build_object(\n" +
            "                'userId', tau2.user_id,\n" +
            "                'firstname', ud.firstname,\n" +
            "                'middlename', ud.middlename,\n" +
            "                'lastname', ud.lastname,\n" +
            "                'profileURL', ud.image_url\n" +
            "            ))\n" +
            "        FROM \n" +
            "            tender_assigned_users tau2\n" +
            "        LEFT JOIN \n" +
            "            user_detail ud ON tau2.user_id = ud.user_id\n" +
            "        WHERE \n" +
            "            tau2.tender_id = td.id\n" +
            "    ) as jsonb) AS \"assignedUser\" from tender_details td\n" +
            "left join tender_assigned_users tau2 on tau2.tender_id  = td.id \n" +
            "left join tender_type tt on td.tender_type  = tt.id \n" +
            "where td.id in \n" +
            "(select tau.tender_id from tender_assigned_users tau where tau.user_id = :userId)\n" +
            "group by td.id, tt.tender_stage_name", nativeQuery = true)
    public List<Map<String, Object>> findTenderByUser(@Param(value = "userId") Long userId);
}
