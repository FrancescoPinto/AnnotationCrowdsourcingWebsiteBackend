/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

/**
 *
 * @author Utente
 */
public class ImageDTO {
    private String id;
    private String canonical;

    public ImageDTO(Long id, Long campaignId, String canonical) {
        this.id = "/api/campaign/"+campaignId+"/image/"+id;
        this.canonical = canonical;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCanonical() {
        return canonical;
    }

    public void setCanonical(String canonical) {
        this.canonical = canonical;
    }
    
}
