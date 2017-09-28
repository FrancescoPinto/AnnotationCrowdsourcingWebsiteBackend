/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatisticsDetails;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Utente
 */
@Service
public interface ImageService {
    public Image store(MultipartFile file, String APIToken, Long campaignId) throws IOException, URISyntaxException;
    public Resource loadFile(String filename);
    public void deleteAll();
    public void init();
    public void deleteImage(String APIToken, Long campaignId,Long imageId) throws IOException, URISyntaxException;
    public FileSystemResource getFileSystemResource(Long campaignId, Long imageId);
    public Image getImageInfo(String APIToken, Long campaignId,Long imageId)throws IOException, URISyntaxException;  
    
    public ImageStatisticsDetails getImageStatisticsDetails(String APIToken, Long campaignId, Long imageId) throws IOException, URISyntaxException;
    public List<Image> getCampaignImages(String APIToken, Long campaignId) throws IOException, URISyntaxException;
    public List<Image> getSelectedImages(Campaign c);
}
