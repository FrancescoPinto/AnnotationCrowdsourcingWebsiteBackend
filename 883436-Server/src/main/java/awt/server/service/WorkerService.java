/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.User;
import awt.server.model.convenience.Worker;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface WorkerService {
     public List<Worker> getWorkersForCampaign(String APIToken, Long campaignId) throws IOException, URISyntaxException;
    public Worker getWorkerInfo(String APIToken, Long workerId, Long campaignId) throws IOException, URISyntaxException;
    public void enableWorkerForSelectionForCampaign(String APIToken,Long workerId,Long campaignId)throws IOException, URISyntaxException;      
    public void disableWorkerForSelectionForCampaign(String APIToken,Long workerId,Long campaignId)throws IOException, URISyntaxException;  
    public void enableWorkerForAnnotationForCampaign(String APIToken,Long workerId,Long campaignId)throws IOException, URISyntaxException;  
    public void disableWorkerForAnnotationForCampaign(String APIToken,Long workerId,Long campaignId)throws IOException, URISyntaxException;  
}
