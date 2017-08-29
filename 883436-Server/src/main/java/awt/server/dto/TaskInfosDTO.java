/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Task;

/**
 *
 * @author Utente
 */
public class TaskInfosDTO {
    private Long id;
    private String type,
                   campaign,
                   session,
                   statistics;

    public TaskInfosDTO(Long id, String type, String campaign, String session, String statistics) {
        this.id = id;
        this.type = type;
        this.campaign = campaign;
        this.session = session;
        this.statistics = statistics;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getStatistics() {
        return statistics;
    }

    public void setStatistics(String statistics) {
        this.statistics = statistics;
    }
    
    public static TaskInfosDTO fromTasktoTaskInfosDTO(Task t){
        String campaign = t.getCampaign().getName();
        return new TaskInfosDTO(t.getId(),t.getType(), campaign,"/api/task/"+t.getId()+"/session","/api/task/"+t.getId()+"/statistics");
    }
    
}
