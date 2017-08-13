/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;

/**
 *
 * @author Utente
 */
public class UserDetailsDTO {
    private String fullname,
                   username,
                   type;

    public UserDetailsDTO() {
    }
    
    public UserDetailsDTO(User user) {
        this.fullname = user.getFullname();
        this.username = user.getUsername();
        if(user instanceof Master)
            this.type = "master";
        else if(user instanceof Worker)
            this.type = "worker";
    }

    public UserDetailsDTO(String fullname, String username, String type) {
        this.fullname = fullname;
        this.username = username;
        this.type = type;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
}
