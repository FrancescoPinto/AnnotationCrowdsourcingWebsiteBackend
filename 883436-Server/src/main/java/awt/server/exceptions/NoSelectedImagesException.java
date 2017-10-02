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
public class NoSelectedImagesException extends RuntimeException {
    public NoSelectedImagesException(){
        super("No Selected Images are already available, wait and try again.");
    }
    
}
