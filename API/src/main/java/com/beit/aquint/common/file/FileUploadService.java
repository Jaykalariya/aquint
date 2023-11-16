package com.beit.aquint.common.file;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 12/11/23  12:14 pm
 */
@Service
public class FileUploadService {

    @Value("${amazonProperties.bucketName}")
    private String BUCKET_NAME;

    @Value("${amazonProperties.accessKey}")
    private String ACCESS_KEY;

    @Value("${amazonProperties.secretKey}")
    private String SECRET_KEY;

    @Value("${amazonProperties.endpointUrl}")
    private String END_POINT_URL;

    private AmazonS3 s3client;

    public String uploadFile(MultipartFile multipartFile, String path) throws IOException {
        initializeAmazon();
        File file = convertMultiPartToFile(multipartFile);
        String fileName = path + "/" + generateFileName(multipartFile);
        uploadFileTos3bucket(fileName, file);
        String fileUrl = END_POINT_URL + "/" + BUCKET_NAME + "/" + fileName;
        return fileUrl;
    }

    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.ACCESS_KEY, this.SECRET_KEY);
        this.s3client = new AmazonS3Client(credentials);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3client.putObject(new PutObjectRequest(BUCKET_NAME, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }
}
