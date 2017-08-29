/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.WorkerDTO;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.User;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface CampaignService {
    public List<Campaign> getMasterCampaigns(User user); // QUESTO IO LO SPOSTEREI IN USER <-
    public Campaign createCampaign(Campaign campaign);
    public Campaign getCampaignDetails(Long campaignId,User user);
    public void editCampaign(User u, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize);
    public List<WorkerDTO> getWorkersForCampaign(User u, Long campaignId);
    public WorkerDTO getWorkerInfo(User user, Long workerId, Long campaignId);
    public void enableWorkerForSelectionForCampaign(User u,Long workerId,Long campaignId);      
    public void disableWorkerForSelectionForCampaign(User u,Long workerId,Long campaignId);  
    public void enableWorkerForAnnotationForCampaign(User u,Long workerId,Long campaignId);  
    public void disableWorkerForAnnotationForCampaign(User u,Long workerId,Long campaignId);  
    
    public void startCampaign(User u,Long campaignId);  
    public void terminateCampaign(User u,Long campaignId);  
    public List<Image> getCampaignImages(User user, Long campaignId);
}
