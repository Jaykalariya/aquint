package com.beit.aquint.tender.tenderdashboard.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.tender.tenderdashboard.repository.TenderDashboardRepository;
import com.beit.aquint.tender.tenderdashboard.service.TenderDashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class TenderDashboardServiceImpl implements TenderDashboardService {

    @Autowired
    TenderDashboardRepository tenderDashboardRepository;

    @Override
    public  Map<String,List<Map<String,Object>>> getTenderDashboard(Date startDate, Date endDate)  throws AquintCommonException {
        try {
            log.debug("Getting Tender Dashboard");
            Map<String,List<Map<String,Object>>> dashboard = new HashMap<>();
            dashboard.put("valueByStage",getProjectValueByTenderStageValue(startDate,endDate));
            dashboard.put("amountAndFeeByStage",getEmdAmountAndTenderFeeByTenderStageValue(startDate,endDate));
            dashboard.put("pieChartForStage",getProjectValueByEachTenderStage(startDate,endDate));
            dashboard.put("pieChartForType",getProjectValueByEachTenderType(startDate,endDate));
            dashboard.put("graph", getProjectValueAndProjectCountsByMonth());
            dashboard.put("dashboardHistory",getLastFiveTenderHistory());
            return dashboard;
        } catch (Exception exception) {
            log.error("Error fetching Tender Dashboard", exception);
            throw new AquintCommonException("Unable to Fetch");
        }
    }


    private List<Map<String,Object>> getProjectValueByTenderStageValue(Date startDate,Date endDate){
        return tenderDashboardRepository.getProjectValueByTenderStageValue(startDate,endDate);
    }

    private List<Map<String, Object>> getEmdAmountAndTenderFeeByTenderStageValue(Date startDate,Date endDate){
        return tenderDashboardRepository.getEmdAmountAndTenderFeeByTenderStageValue(startDate,endDate);
    }

    private List<Map<String,Object>> getProjectValueByEachTenderStage(Date startDate,Date endDate){
        return tenderDashboardRepository.getProjectValueByEachTenderStage(startDate,endDate);
    }

    private List<Map<String,Object>> getProjectValueByEachTenderType(Date startDate,Date endDate){
        return tenderDashboardRepository.getProjectValueByEachTenderType(startDate,endDate);
    }

    private List<Map<String,Object>> getLastFiveTenderHistory(){
        return tenderDashboardRepository.getLastFiveTenderHistory();
    }

    private List<Map<String,Object>> getProjectValueAndProjectCountsByMonth(){
        return tenderDashboardRepository.getProjectValueAndProjectCountsByMonth();
    }
}
