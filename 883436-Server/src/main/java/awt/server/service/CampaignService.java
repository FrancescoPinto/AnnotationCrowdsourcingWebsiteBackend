/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.Campaign;
import awt.server.model.convenience.ImageStatistics;
import awt.server.model.convenience.NewCampaign;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service

public interface CampaignService {
    public List<Campaign> getMasterCampaigns(String APIToken) throws IOException, URISyntaxException; // QUESTO IO LO SPOSTEREI IN USER <-
    public Campaign createCampaign(String APIToken,NewCampaign campaign) throws IOException, URISyntaxException;
    public Campaign getCampaignDetails(Long campaignId,String APIToken) throws IOException, URISyntaxException;
    public void editCampaign(String APIToken, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize) throws IOException, URISyntaxException;
    public ImageStatistics getCampaignImageStatistics(String APIToken, Long campaignId)throws IOException, URISyntaxException;
    public void startCampaign(String APIToken,Long campaignId)throws IOException, URISyntaxException;  
    public void terminateCampaign(String APIToken,Long campaignId)throws IOException, URISyntaxException;  
    
}
