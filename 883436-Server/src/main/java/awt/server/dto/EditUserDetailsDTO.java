/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author Utente
 */
public class EditUserDetailsDTO {
    // @NotEmpty
    //@Length(min = 3, max = 15)
    private String fullname,
                   password;

    public EditUserDetailsDTO() {
    }

    public EditUserDetailsDTO(String username, String password) {
        this.fullname = username;
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
