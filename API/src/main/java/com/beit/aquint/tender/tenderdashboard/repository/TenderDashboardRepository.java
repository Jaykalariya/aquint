package com.beit.aquint.tender.tenderdashboard.repository;


import com.beit.aquint.common.constant.Constant;
import com.beit.aquint.tender.tenderprocess.entity.TenderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TenderDashboardRepository  extends JpaRepository<TenderDetails, Long> {

    @Query(value = Constant.TenderDashboardQuery.PROJECT_VALUE_BY_TENDER_STAGE_VALUE, nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByTenderStageValue();

    @Query(value = Constant.TenderDashboardQuery.EMD_AMOUNT_AND_TENDER_FEE_BY_TENDER_STAGE_VALUE, nativeQuery = true)
    public List<Map<String,Object>> getEmdAmountAndTenderFeeByTenderStageValue();

    @Query(value = Constant.TenderDashboardQuery.PROJECT_VALUE_BY_EACH_TENDER_STAGE, nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByEachTenderStage();


    @Query(value = Constant.TenderDashboardQuery.PROJECT_VALUE_BY_EACH_TENDER_TYPE, nativeQuery = true)
    public List<Map<String,Object>> getProjectValueByEachTenderType();

    @Query(value = Constant.TenderDashboardQuery.PROJECT_VALUE_AND_PROJECT_COUNTS_BY_MONTH, nativeQuery = true)
    public List<Map<String,Object>> getProjectValueAndProjectCountsByMonth();

    @Query(value = Constant.TenderDashboardQuery.LAST_FIVE_TENDER_HISTORY, nativeQuery = true)
    public List<Map<String,Object>> getLastFiveTenderHistory();
}
