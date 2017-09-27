/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.Campaign;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatistics;
import awt.server.model.convenience.NewCampaign;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service
@Transactional
public interface CampaignService {
    public List<Campaign> getMasterCampaigns(User user); // QUESTO IO LO SPOSTEREI IN USER <-
    public Campaign createCampaign(User user,NewCampaign campaign);
    public Campaign getCampaignDetails(Long campaignId,User user);
    public void editCampaign(String APIToken, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize);
    public ImageStatistics getCampaignImageStatistics(User u, Long campaignId);
    public void startCampaign(User u,Long campaignId);  
    public void terminateCampaign(User u,Long campaignId);  
    
}
