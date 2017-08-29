/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.Image;
import awt.server.model.User;
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
public interface ImageStorageService {
    public Image store(MultipartFile file, User u, Long campaignId);
    public Resource loadFile(String filename);
    public void deleteAll();
    public void init();
     public String getFilePathString(Long campaignId, Long imageId);
}
