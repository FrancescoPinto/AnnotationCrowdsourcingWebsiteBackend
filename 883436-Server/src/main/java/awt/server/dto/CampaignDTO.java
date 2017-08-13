/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Campaign;

/**
 *
 * @author Utente
 */

//ATTENTO: INVIERAI UNA List<CampaignDTO> automaticamente convertita in array
public class CampaignDTO {
    private Long id;
    private String name,
                   status;

    public CampaignDTO(Long id, String name, String status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public static CampaignDTO fromCampaignToCampaignDTO(Campaign c){
        return new CampaignDTO(c.getId(),c.getName(),c.getStatus());
    }
    
}
