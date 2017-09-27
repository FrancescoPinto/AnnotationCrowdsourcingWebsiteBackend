/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author Utente
 */
@Entity
public class InvalidToken{
    
    
    private String invalidToken;
    @Id
    private String username;

    public InvalidToken(String invalidToken, String username) {
        this.invalidToken = invalidToken;
        this.username = username;
    }

    public String getInvalidToken() {
        return invalidToken;
    }

    public void setInvalidToken(String invalidToken) {
        this.invalidToken = invalidToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    

    public InvalidToken() {
    }
    
}
