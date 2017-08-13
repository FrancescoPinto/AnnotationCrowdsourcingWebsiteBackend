/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.exceptions;

/**
 *
 * @author Utente
 */
public class UserNotLogged extends RuntimeException {
     public UserNotLogged(){
        super();
    }

    public UserNotLogged(String message){
        super(message);
    }
}
