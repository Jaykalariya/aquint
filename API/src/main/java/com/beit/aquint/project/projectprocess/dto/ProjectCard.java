package com.beit.aquint.project.projectprocess.dto;

import java.math.BigInteger;
import java.util.Date;

public interface ProjectCard {
     Long getId() ;
     BigInteger getCreatedBy();
     Date getCreatedOn();
     Long getModifiedBy();
     Date getModifiedOn();
     String getProjectCustomId();
     Long getTenderId();
     String getProjectDisplayName();
     Integer getInitialStepsStatus();
     Integer getProgress();
     BigInteger getStepId();
     BigInteger getCompletedStepLength();
     String getProjectname();
}
