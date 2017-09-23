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
public class CampaignsNotFoundException extends RuntimeException {
    public CampaignsNotFoundException(){
        super("Campaigns not found for this user");
    }
    
    public CampaignsNotFoundException(String message){
        super(message);
    }
    
}
