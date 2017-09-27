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
public class TaskResultDTO {
       private String skyline;
       private Boolean accepted;
       private String type;

    public TaskResultDTO(String skyline, Boolean accepted) {
        this.skyline = skyline;
        this.accepted = accepted;
        if(this.skyline != null)
            this.type = "annotation";
        else
            this.type = "selection";
    }

    public String getSkyline() {
        return skyline;
    }

    public void setSkyline(String skyline) {
        this.skyline = skyline;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        if(skyline != null)
            this.type = "annotation";
        else
            this.type = "selection";
    }
}
