/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import awt.server.dto.*;
import awt.server.model.Task;

/**
 *
 * @author Utente
 */
public class TaskInfos {
    private String id;
    private String type,
                   campaign;

    public TaskInfos(String id, String type, String campaign) {
        this.id = id;
        this.type = type;
        this.campaign = campaign;
    }
    
      public TaskInfos(Long id, String type, String campaign) {
        this.id = ""+id;
        this.type = type;
        this.campaign = campaign;
  
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCampaign() {
        return campaign;
    }

    public void setCampaign(String campaign) {
        this.campaign = campaign;
    }
    
    public static TaskInfos fromTasktoTaskInfos(Task t){
        String campaign = t.getCampaign().getName();
        return new TaskInfos(t.getId(),t.getType(), campaign);
        //"/api/task/"+t.getId()+"/session","/api/task/"+t.getId()+"/statistics"
    }
    
}
