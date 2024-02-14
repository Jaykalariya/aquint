package com.beit.aquint.tender.tenderdashboard.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.tender.tenderdashboard.repository.TenderDashboardRepository;
import com.beit.aquint.tender.tenderdashboard.service.TenderDashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class TenderDashboardServiceImpl implements TenderDashboardService {

    @Autowired
    TenderDashboardRepository tenderDashboardRepository;

    @Override
    public  Map<String,List<Map<String,Object>>> getTenderDashboard()  throws AquintCommonException {
        try {
            log.debug("Getting Tender Dashboard");
            Map<String,List<Map<String,Object>>> dashboard = new HashMap<>();
            dashboard.put("valueByStage",getProjectValueByTenderStageValue());
            dashboard.put("amountAndFeeByStage",getEmdAmountAndTenderFeeByTenderStageValue());
            dashboard.put("pieChartForStage",getProjectValueByEachTenderStage());
            dashboard.put("pieChartForType",getProjectValueByEachTenderType());
            dashboard.put("graph", getProjectValueAndProjectCountsByMonth());
            dashboard.put("dashboardHistory",getLastFiveTenderHistory());
            return dashboard;
        } catch (Exception exception) {
            log.error("Error fetching Tender Dashboard", exception);
            throw new AquintCommonException("Unable to Fetch");
        }
    }


    private List<Map<String,Object>> getProjectValueByTenderStageValue(){
        return tenderDashboardRepository.getProjectValueByTenderStageValue();
    }

    private List<Map<String, Object>> getEmdAmountAndTenderFeeByTenderStageValue(){
        return tenderDashboardRepository.getEmdAmountAndTenderFeeByTenderStageValue();
    }

    private List<Map<String,Object>> getProjectValueByEachTenderStage(){
        return tenderDashboardRepository.getProjectValueByEachTenderStage();
    }

    private List<Map<String,Object>> getProjectValueByEachTenderType(){
        return tenderDashboardRepository.getProjectValueByEachTenderType();
    }

    private List<Map<String,Object>> getLastFiveTenderHistory(){
        return tenderDashboardRepository.getLastFiveTenderHistory();
    }

    private List<Map<String,Object>> getProjectValueAndProjectCountsByMonth(){
        return tenderDashboardRepository.getProjectValueAndProjectCountsByMonth();
    }
}
