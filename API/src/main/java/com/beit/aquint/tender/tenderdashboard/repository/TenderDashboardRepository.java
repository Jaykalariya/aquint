package com.beit.aquint.tender.tenderdashboard.repository;


import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TenderDashboardRepository  extends JpaRepository<TenderDetails, Long> {

    @Query(value = "SELECT sum(project_value) AS projectValue, count(td.tender_stage) AS projectCount, ts.stage_value AS stageValue from tender_details td\n" +
            "full join tender_stage ts on td.tender_stage=ts.id \n" +
            "group by ts.stage_value", nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByTenderStageValue();

    @Query(value = "SELECT sum(emd_amount) AS emdAmount, sum(tender_fee) AS tenderFee, count(td.tender_stage) AS projectCount, ts.stage_value from tender_details td\n" +
            "full join tender_stage ts on td.tender_stage=ts.id \n" +
            "group by ts.stage_value", nativeQuery = true)
    public List<Map<String,Object>> getEmdAmountAndTenderFeeByTenderStageValue();

    @Query(value = "SELECT sum(project_value) AS projectValue, count(td.tender_stage) AS projectCount, ts.tender_stage_name AS tenderStageName from tender_details td\n" +
            "Left join tender_stage ts on td.tender_stage=ts.id group by ts.id", nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByEachTenderStage();


    @Query(value = "SELECT sum(project_value)  AS projectValue, count(td.tender_type) AS projectCount, tt.tender_type_name  AS tenderStageType,tt.status  AS tenderTypeStatus from tender_details td\n" +
            "Left join tender_type tt on td.tender_type=tt.id group by tt.id", nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByEachTenderType();

    @Query(value = "SELECT\n" +
            "  to_char(months, 'Month') AS month_name,\n" +
            "  DATE_TRUNC('month', months) AS month,\n" +
            "  COALESCE(SUM(project_value), 0) AS project_value,\n" +
            "  COALESCE(COUNT(td.tender_stage), 0) AS project_count,\n" +
            "  ts.stage_value AS stageValue\n" +
            "FROM\n" +
            "  generate_series(\n" +
            "    (SELECT MIN(DATE_TRUNC('month', created_on)) FROM tender_details),\n" +
            "    (SELECT MAX(DATE_TRUNC('month', created_on)) FROM tender_details),\n" +
            "    '1 month'\n" +
            "  ) AS months\n" +
            "LEFT JOIN\n" +
            "  tender_details td ON DATE_TRUNC('month', created_on) = months\n" +
            "LEFT JOIN\n" +
            "  tender_stage ts ON td.tender_stage = ts.id\n" +
            "GROUP BY\n" +
            "  months.months, ts.stage_value\n" +
            "ORDER BY\n" +
            "  month, ts.stage_value;\n", nativeQuery = true)
    public List<Map<String,Object>> getProjectValueAndProjectCountsByMonth();

    @Query(value = "SELECT td.project_name, th.name, \n" +
            "COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,'') AS fullName,\n" +
            "ud.image_url\n" +
            "from tender_details td left join tender_history th on td.id=th.tender_id left join user_detail ud on th.created_by=ud.user_id order by th.created_on DESC LIMIT 5", nativeQuery = true)
    public List<Map<String,Object>> getLastFiveTenderHistory();
}
