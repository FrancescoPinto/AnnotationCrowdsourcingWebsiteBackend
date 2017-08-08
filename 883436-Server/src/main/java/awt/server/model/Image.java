/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * @author Utente
 */
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic
    private String canonical;

    @Basic
    private String filePath;

    @ManyToOne(targetEntity = Campaign.class)
    private Campaign campaign;

  
    public String getCanonical() {
        return this.canonical;
    }

    public void setCanonical(String canonical) {
        this.canonical = canonical;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

   

}