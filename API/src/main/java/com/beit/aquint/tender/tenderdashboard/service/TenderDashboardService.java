package com.beit.aquint.tender.tenderdashboard.service;

import com.beit.aquint.common.config.exception.AquintCommonException;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface TenderDashboardService {

    public Map<String,List<Map<String,Object>>> getTenderDashboard(Date startDate, Date endDate) throws AquintCommonException;
}
