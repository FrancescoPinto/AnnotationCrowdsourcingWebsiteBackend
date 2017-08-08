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
public class TaskResultAnnotationDTO {
    private String skyline;

    public TaskResultAnnotationDTO(String skyline) {
        this.skyline = skyline;
    }

    public String getSkyline() {
        return skyline;
    }

    public void setSkyline(String skyline) {
        this.skyline = skyline;
    }
    
}
