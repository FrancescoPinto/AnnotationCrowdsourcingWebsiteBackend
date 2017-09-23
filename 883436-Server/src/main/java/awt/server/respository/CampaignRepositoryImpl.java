/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.exceptions.CampaignNotFoundException;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Utente
 */
@Repository
public class CampaignRepositoryImpl implements CampaignRepository {
     @PersistenceContext
    private EntityManager em;
     
     private static final String STARTED = "started", READY = "ready", ENDED = "ended";
     
     @Override
     public List<Campaign> getMasterCampaigns(Master master){
         Query q = em.createQuery("select c from Campaign c where c.master.id = ?1"); //createnamedQuer
         q.setParameter(1,master.getId());
         return q.getResultList();
     }
     
     @Override
     public Campaign createCampaign(Campaign campaign){
         em.persist(campaign);
         return em.find(Campaign.class, campaign.getId());
     }
     
     @Override
     public Campaign getCampaignDetails(Long campaignId, Master master){
         Query q = em.createQuery("select c from Campaign c where c.master.id = ?1 and id = ?2"); //createnamedQuer
         q.setParameter(1,master.getId());
         q.setParameter(2,campaignId);
         List<Campaign> result = q.getResultList();
         if(result.isEmpty()){
              System.out.println("NO CAMPAIGN DATA");
             return null;
         }
         else{
             System.out.println("DAL REPOSITORY" + result.get(0).getId());
            return result.get(0);
         }
     }
     
     @Override
     public void editCampaign(Master master, Campaign c, String name, int selectRepl, int thr, int annRepl, int annSize){
        // Campaign c = em.find(Campaign.class, campaignId);
         if(c == null)
             throw new CampaignNotFoundException();
         else{
             c.setName(name);
             c.setAnnotationReplica(annRepl);
             c.setSelectionReplica(selectRepl);
             c.setThreshold(thr);
             c.setAnnotationSize(annSize);
         }
     }
     
     @Override
      public void startCampaign(Master u, Campaign c){
          if(c == null)
             throw new CampaignNotFoundException();
         else{
          c.setStatus(STARTED);
          }
      }
      @Override
    public void terminateCampaign(Master u,Campaign c){
        if(c == null)
             throw new CampaignNotFoundException();
         else{
        c.setStatus(ENDED);
        }
    }
    
   
      /*public Campaign createCampaign(String name, int selectionReplica, int threshold, int annotationReplica, int annotationSize){
         Campaign c = em.find(Campaign.class, )
     }*/
}
