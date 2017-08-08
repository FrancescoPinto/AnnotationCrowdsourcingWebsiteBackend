/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * @author Utente
 */
@Entity
public class CampaignStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic
    private int numImages;

    @Basic
    private int numAccepted;

    @Basic
    private int numRejected;

    @Basic
    private int numAnnotation;

    @OneToOne(targetEntity = Campaign.class)
    private Campaign campaign;
  

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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