/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.exceptions.CampaignNotFoundException;
import awt.server.model.Campaign;
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
         if(result.isEmpty())
             return null;
         else
            return result.get(0);
     }
     
     @Override
     public void editCampaign(Master master, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize){
         Campaign c = em.find(Campaign.class, campaignId);
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
      /*public Campaign createCampaign(String name, int selectionReplica, int threshold, int annotationReplica, int annotationSize){
         Campaign c = em.find(Campaign.class, )
     }*/
}
