/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Utente
 */
@Repository
public interface ImageRepository {
    public Image store(MultipartFile file, Master m, Campaign c);
    
    public Resource loadFile(String filename);
    public void deleteAll();
    
    public void init();
    
    public Image getImage(Long campaignId, Long imageId);
    
    public FileSystemResource getFileSystemResource(Long campaignId,Long imageId);
    public void deleteImage(Long campaignId, Long imageId);

}
