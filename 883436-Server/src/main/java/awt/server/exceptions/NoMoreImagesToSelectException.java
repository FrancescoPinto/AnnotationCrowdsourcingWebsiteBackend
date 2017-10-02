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
public class NoMoreImagesToSelectException extends RuntimeException {
    public NoMoreImagesToSelectException(){
        super("No more images to select available.");
    }
    
}
