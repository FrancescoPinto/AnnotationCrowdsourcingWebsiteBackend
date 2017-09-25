/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import javax.validation.constraints.NotNull;

/**
 *
 * @author Utente
 */
public class TaskResultSelectionDTO {
    @NotNull
    private Boolean accepted;

    public TaskResultSelectionDTO(boolean accepted) {
        this.accepted = accepted;
    }

    public TaskResultSelectionDTO() {
    }

    public boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
    
}
