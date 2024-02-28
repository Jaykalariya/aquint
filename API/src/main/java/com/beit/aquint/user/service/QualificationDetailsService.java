package com.beit.aquint.user.service;

import com.beit.aquint.user.entity.PersonalAccountDetails;
import com.beit.aquint.user.entity.QualificationDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface QualificationDetailsService {

    QualificationDetails addQualificationDetails(QualificationDetails qualificationDetails);

    public Optional<QualificationDetails> getUserQualificationDetail(Long userId);


    public List<QualificationDetails> getAllUserQualificationDetails();

    QualificationDetails updateQualificationDetails(Long userId, QualificationDetails updatedQualificationDetails);

    public String uploadQualificationDocument(MultipartFile multipartFile) throws IOException;

}
