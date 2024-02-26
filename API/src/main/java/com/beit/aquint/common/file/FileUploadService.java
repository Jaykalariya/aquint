package com.beit.aquint.common.file;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Value(("${file.path}"))
    private String filePath;

    private AmazonS3 s3client;


    public String uploadFile(MultipartFile multipartFile, String path) throws IOException {
        try {
            initializeAmazon();
            File file = convertMultiPartToFile(multipartFile);
            String fileName = path + "/" + generateFileName(multipartFile);
            uploadFileTos3bucket(fileName, file);

            String fileUrl = END_POINT_URL + "/" + BUCKET_NAME + "/" + fileName;
            return fileUrl;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException();
        }

    }

    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.ACCESS_KEY, this.SECRET_KEY);
        this.s3client = new AmazonS3Client(credentials);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(filePath + "/" + file.getOriginalFilename());
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

    public String getExtension(MultipartFile multipartFile) throws IOException {
        Tika tika = new Tika();
        String mimeType = tika.detect(multipartFile.getInputStream());
        String extension = mimeType.split("/")[1];
        return extension;
    }

    public String deleteFile(String fileUrl) {
        try {
            initializeAmazon();
            String fileName = extractFileName(fileUrl);
            s3client.deleteObject(BUCKET_NAME,fileName);
            System.out.println("File deleted");
            return fileName;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Error deleting file from S3: " + ex.getMessage());
        }
    }

    private static String extractFileName(String fileUrl) {
        String[] parts = fileUrl.split("/");
        String fileName = parts[parts.length - 3]+"/"+parts[parts.length - 2]+"/"+parts[parts.length - 1];
        return fileName;
    }

}
