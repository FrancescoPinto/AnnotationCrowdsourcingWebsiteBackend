/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.ImageStatisticsDetailsDTO;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.respository.CampaignRepository;
import awt.server.respository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
@Transactional
public class ImageStorageServiceImpl implements ImageStorageService {
    @Autowired
    ImageRepository imageRepository;
    
    @Autowired
    CampaignRepository campaignRepository;
    
    @Override
      public Image store(MultipartFile file, User u, Long campaignId){
          if(u instanceof Master){
          Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) u);
          return imageRepository.store(file,(Master) u, c);
          }
          else throw new UserNotMasterException();
      }
    
      @Override
    public Resource loadFile(String filename){
        return imageRepository.loadFile(filename);
    }
    
    @Override
    public void deleteAll(){
        imageRepository.deleteAll();
    }
    @Override
    public void init(){
        imageRepository.init();
    }
    
    
    @Override
    public FileSystemResource getFileSystemResource(Long campaignId, Long imageId){
        return imageRepository.getFileSystemResource(campaignId,imageId);
    }
    
    @Override
    public void deleteImage(User u, Long campaignId,Long imageId){
          if(u instanceof Master){
          imageRepository.deleteImage(campaignId,imageId);
          }
          else throw new UserNotMasterException();
    } 
    
    @Override
    public Image getImageInfo(User u, Long campaignId,Long imageId){
        if(u instanceof Master){
          return imageRepository.getImage(campaignId,imageId);
          }
          else throw new UserNotMasterException();
    }
    
 
}
