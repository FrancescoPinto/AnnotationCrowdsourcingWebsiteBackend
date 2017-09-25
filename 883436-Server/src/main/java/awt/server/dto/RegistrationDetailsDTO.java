/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;


import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author Utente
 */
public class RegistrationDetailsDTO {
    @NotEmpty
    @Size(min = 3, max = 15)
    private String fullname,
                   username,
                   password,
                   type;

    public RegistrationDetailsDTO() {
    }

    public RegistrationDetailsDTO(String fullname, String username, String password, String type) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
}
