/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import javax.persistence.Basic;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import static javax.persistence.InheritanceType.SINGLE_TABLE;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

/**
 * @author Utente
 */
@Inheritance(strategy=SINGLE_TABLE)
@DiscriminatorColumn(name = "Discr")
@MappedSuperclass

public abstract class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic
    private String statusCompleted;


    @ManyToOne(targetEntity = Worker.class)
    private Worker worker;

    @ManyToOne(targetEntity = Campaign.class)
    private Campaign campaign;

    public Task(Long id, String statusCompleted, Worker worker, Campaign campaign) {
        this.id = id;
        this.statusCompleted = statusCompleted;
        this.worker = worker;
        this.campaign = campaign;
    }

    public Task() {
    }

    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatusCompleted() {
        return statusCompleted;
    }

    public void setStatusCompleted(String statusCompleted) {
        this.statusCompleted = statusCompleted;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

   

}