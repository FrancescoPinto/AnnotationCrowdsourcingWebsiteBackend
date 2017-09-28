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
public class IllegalStateOfWorkingSession extends RuntimeException {
    public IllegalStateOfWorkingSession(){
        super("The working session is in an illegal state");
    }
    
}
