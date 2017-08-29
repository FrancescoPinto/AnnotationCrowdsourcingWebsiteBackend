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
public class CampaignNotStartedException extends RuntimeException {
    public CampaignNotStartedException(){
        super("Campaign is not in started status. Only Campaigns in started status can be terminated");
    }
}
