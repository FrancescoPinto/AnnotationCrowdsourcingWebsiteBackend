/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.exceptions.TaskNotFoundException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Image;
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
public class AnnotationTaskInstanceRepositoryImpl implements AnnotationTaskInstanceRepository {
    
    @PersistenceContext
    EntityManager em;
    
    @Override
        public List<AnnotationTaskInstance> getAnnotationTaskInstancesForImageOfCampaign(Long imageId){
            Query q = em.createQuery("select ati from AnnotationTaskInstance ati where ati.image.id = ?1");
            q.setParameter(1,imageId);
            List<AnnotationTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                return null;
            else
                return temp;
        }
        
        @Override
        public List<AnnotationTaskInstance> getAnnotationTaskInstancesOfCampaign(Long campaignId){
            Query q = em.createQuery("select ati from AnnotationTaskInstance ati where ati.annotationTask.campaign.id = ?1");
            q.setParameter(1,campaignId);
            List<AnnotationTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                return null;
            else 
                return temp;
        }
        
          @Override
        public AnnotationTaskInstance getNextAnnotationTaskInstance(Task t){
             if(t.getType().equals(Task.ANNOTATION)){
                 List<AnnotationTaskInstance> atis = t.getAnnotationTaskInstance();
                 for(AnnotationTaskInstance ati: atis)
                 {
                     if(ati.getSkyline().equals(AnnotationTaskInstance.NOTALREADY))
                         return ati;
                 }
                 return null;
             }
             else 
                 return null;
        }
        
        @Override
        public void setCurrentTaskInstanceResult(Long currentTaskInstanceId,String annotation){
            Query q = em.createQuery("select ati from AnnotationTaskInstance ati where ati.id= ?1");
            q.setParameter(1,currentTaskInstanceId);
            List<AnnotationTaskInstance> temp = q.getResultList();
            if(temp.isEmpty())
                 throw new TaskNotFoundException(); 
            else
              temp.get(0).setSkyline(annotation);
        }
        
        @Override
        public void createAnnotationTaskInstance(Image i,Task t, String status){
            AnnotationTaskInstance a = new AnnotationTaskInstance(status,i,t);
            em.persist(a);
        }

}
