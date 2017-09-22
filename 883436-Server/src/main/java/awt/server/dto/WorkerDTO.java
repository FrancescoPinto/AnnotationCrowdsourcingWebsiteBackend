/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Worker;

/**
 *
 * @author Utente
 */
public class WorkerDTO {
    private String id;
    private String fullname;
    private boolean selector,
                    annotator;

    public WorkerDTO(String id, String fullname, boolean selector, boolean annotator) {
        this.id = id;
        this.fullname = fullname;
        this.selector = selector;
        this.annotator = annotator;
    }
    
    public WorkerDTO(Long id, Long campaignId, String fullname, boolean selector, boolean annotator) {
        this.id = "/api/campaign/"+campaignId+"/worker/"+id;
        this.fullname = fullname;
        this.selector = selector;
        this.annotator = annotator;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
