/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.User;
import awt.server.model.convenience.Worker;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface WorkerService {
     public List<Worker> getWorkersForCampaign(User u, Long campaignId);
    public Worker getWorkerInfo(User user, Long workerId, Long campaignId);
    public void enableWorkerForSelectionForCampaign(User u,Long workerId,Long campaignId);      
    public void disableWorkerForSelectionForCampaign(User u,Long workerId,Long campaignId);  
    public void enableWorkerForAnnotationForCampaign(User u,Long workerId,Long campaignId);  
    public void disableWorkerForAnnotationForCampaign(User u,Long workerId,Long campaignId);  
}
