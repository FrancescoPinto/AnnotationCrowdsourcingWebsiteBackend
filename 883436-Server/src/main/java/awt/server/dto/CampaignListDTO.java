/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import java.util.List;

/**
 *
 * @author Utente
 */
public class CampaignListDTO {
    private List<CampaignDTO> campaigns;

    public CampaignListDTO(List<CampaignDTO> campaigns) {
        this.campaigns = campaigns;
    }

    public CampaignListDTO() {
    }

    public List<CampaignDTO>  getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(List<CampaignDTO>  campaigns) {
        this.campaigns = campaigns;
    }
    
    
}
