/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.convenience.NewCampaign;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */

@Repository
@Transactional
public interface CampaignRepository {
    public List<Campaign> getMasterCampaigns(Master master);
    public Campaign createCampaign(Master user,NewCampaign campaign);
    public Campaign getCampaignDetails(Long campaignId, Master master);
    public void editCampaign(Master master, Campaign campaign, String name, int selectRepl, int thr, int annRepl, int annSize);
    public void startCampaign(Master u,Campaign campaign);  
    public void terminateCampaign(Master u,Campaign campaign);   
   
}
