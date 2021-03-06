/**
 * This file was generated by the Jeddict
 */
package awt.server.model.convenience;

import awt.server.model.Campaign;

/**
 * @author Utente
 */

public class CampaignStatistics {

    private int numImages;

    private int numAccepted;

    private int numRejected;

    private int numAnnotation;

    private Campaign campaign;
  

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public int getNumImages() {
        return numImages;
    }

    public void setNumImages(int numImages) {
        this.numImages = numImages;
    }

    public int getNumAccepted() {
        return numAccepted;
    }

    public void setNumAccepted(int numAccepted) {
        this.numAccepted = numAccepted;
    }

    public int getNumRejected() {
        return numRejected;
    }

    public void setNumRejected(int numRejected) {
        this.numRejected = numRejected;
    }

    public int getNumAnnotation() {
        return numAnnotation;
    }

    public void setNumAnnotation(int numAnnotation) {
        this.numAnnotation = numAnnotation;
    }


}