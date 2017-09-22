/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.exceptions.TaskNotFoundException;
import awt.server.model.Image;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
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
public class SelectionTaskInstanceRepositoryImpl implements SelectionTaskInstanceRepository {
    
    @PersistenceContext
    EntityManager em;
    
    @Override
        public List<SelectionTaskInstance> getSelectionTaskInstancesForImageOfCampaign(Long imageId){
            Query q = em.createQuery("select sti from SelectionTaskInstance sti where sti.image.id = ?1");
            q.setParameter(1,imageId);
            List<SelectionTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                return null;
            else
                return temp;
        }
        
        @Override
        public List<SelectionTaskInstance> getSelectionTaskInstancesOfCampaign(Long campaignId){
            Query q = em.createQuery("select sti from SelectionTaskInstance sti where sti.selectionTask.campaign.id = ?1");
            q.setParameter(1,campaignId);
            List<SelectionTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                return null;
            else 
                return temp;
        }
        
         @Override
        public SelectionTaskInstance getNextSelectionTaskInstance(Task t){
             if(t.getType().equals("selection")){
                 List<SelectionTaskInstance> stis = t.getSelectionTaskInstances();
                 for(SelectionTaskInstance sti: stis)
                 {
                     if(sti.getSelected().equals(SelectionTaskInstance.NOTALREADY))
                         return sti;
                 }
                 return null;
             }
             return null;
         }
        
         @Override
        public void setCurrentTaskInstanceResult(Long currentTaskInstanceId,String selected){
            Query q = em.createQuery("select sti from SelectionTaskInstance sti where sti.id= ?1");
            q.setParameter(1,currentTaskInstanceId);
            List<SelectionTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                 throw new TaskNotFoundException(); 
            else
              temp.get(0).setSelected(selected);
        }
        
         @Override
        public void createSelectionTaskInstance(Image i,Task t, String status){
            SelectionTaskInstance s = new SelectionTaskInstance(status,i,t);
            em.persist(s);
        }
    
}
