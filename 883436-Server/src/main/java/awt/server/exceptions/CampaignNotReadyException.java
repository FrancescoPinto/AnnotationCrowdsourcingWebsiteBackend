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
public class CampaignNotReadyException extends RuntimeException {
    public CampaignNotReadyException(){
        super("Campaign is not in ready status. Only Campaigns in ready status can be started");
    }
    
}
