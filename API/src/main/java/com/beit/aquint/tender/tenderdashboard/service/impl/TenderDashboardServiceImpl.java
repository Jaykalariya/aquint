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
            dashboard.put("Project Value By Tender Stage",getProjectValueByTenderStageValue());
            dashboard.put("Emd Amount and Tender Fee By Tender Stage",getEmdAmountAndTenderFeeByTenderStageValue());
            dashboard.put("Project Value By Each Tender Stage",getProjectValueByEachTenderStage());
            dashboard.put("Project Value By Each Tender Type",getProjectValueByEachTenderType());
            dashboard.put("Project Value And Project Count By Month", getProjectValueAndProjectCountsByMonth());
            dashboard.put("Last Five Tender History",getLastFiveTenderHistory());
            return dashboard;
        } catch (Exception exception) {
            throw new AquintCommonException("Unable to Fetch");
        }
    }


    private List<Map<String,Object>> getProjectValueByTenderStageValue(){
        return tenderDashboardRepository.getEmdAmountAndTenderFeeByTenderStageValue();
    }

    private List<Map<String, Object>> getEmdAmountAndTenderFeeByTenderStageValue(){
        return tenderDashboardRepository.getProjectValueByTenderStageValue();
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
