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
public class PreconditionFailedException extends RuntimeException {
    public PreconditionFailedException(){
        super("Precondition failed");
    }
    
    public PreconditionFailedException(String message){
        super(message);
    }
    
}
