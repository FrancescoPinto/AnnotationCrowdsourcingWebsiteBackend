/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import awt.server.dto.*;

/**
 *
 * @author Utente
 */
public class Worker {
    private Long id, campaignId;
    private String fullname;
    private boolean selector,
                    annotator;

    /*public Worker(Long id, Long campaign, String fullname, boolean selector, boolean annotator) {
        this.id = id;
        this.campaignId = campaign;
        this.fullname = fullname;
        this.selector = selector;
        this.annotator = annotator;
    }*/
    
    public Worker(Long id, Long campaignId, String fullname, boolean selector, boolean annotator) {
        this.id = id;
        this.campaignId = campaignId; 
        this.fullname = fullname;
        this.selector = selector;
        this.annotator = annotator;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public boolean isSelector() {
        return selector;
    }

    public void setSelector(boolean selector) {
        this.selector = selector;
    }

    public boolean isAnnotator() {
        return annotator;
    }

    public void setAnnotator(boolean annotator) {
        this.annotator = annotator;
    }
    
}
