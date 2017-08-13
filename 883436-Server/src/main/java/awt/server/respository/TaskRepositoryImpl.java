/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Campaign;
import awt.server.model.Task;
import awt.server.model.Worker;
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
public class TaskRepositoryImpl implements TaskRepository{
    
    @PersistenceContext
    EntityManager em;

    //SELECT T FROM SelectionTask T where T.worker.id = ?1
    @Override
    public Task getWorkerSelectionTaskForCampaign(Long workerId, Long masterId, Long campaignId) {
        Query q = em.createQuery("SELECT t from SelectionTask t where t.worker.id = ?1 and t.campaign.id = ?2 and t.campaign.master.id = ?3");
        q.setParameter(1,workerId);
        q.setParameter(2,campaignId);
        q.setParameter(3,masterId); 
        List<Task> temp =  q.getResultList();
        if (temp.isEmpty())
            return null;
        else 
            return temp.get(0);
    }
    
      @Override
    public Task getWorkerAnnotationTaskForCampaign(Long workerId, Long masterId, Long campaignId) {
        Query q = em.createQuery("SELECT t from AnnotationTask t where t.worker.id = ?1 and t.campaign.id = ?2 and t.campaign.master.id = ?3");
        q.setParameter(1,workerId);
        q.setParameter(2,campaignId);
         q.setParameter(3,masterId); 
        List<Task> temp =  q.getResultList();
        if (temp.isEmpty())
            return null;
        else 
            return temp.get(0);
    }
    
    @Override
    public void createSelectionTaskForWorkerForCampaign(Long workerId, Long masterId, Long campaignId){
        new SelectionTask(String statusCompleted, Worker worker, Campaign campaign)
    }
    @Override
    public void deleteSelectionTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);
    @Override
    public void createAnnotationTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);
    @Override
    public void deleteAnnotationTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);
    
}
