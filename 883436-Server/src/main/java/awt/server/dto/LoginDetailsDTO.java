/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import javax.validation.constraints.Size;

/**
 *
 * @author Utente
 */
public class LoginDetailsDTO {
    
    @Size(min = 3, max = 15)
    private String username,
                   password;

    public LoginDetailsDTO() {
    }

    public LoginDetailsDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
