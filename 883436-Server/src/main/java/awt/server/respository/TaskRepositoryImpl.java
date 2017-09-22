/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.dto.TaskInstanceDTO;
import awt.server.exceptions.TaskAlreadyDefinedException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.WorkingSessionAlreadyOpenedException;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.SelectionTaskInstance;
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
        Query q = em.createQuery("SELECT t from Task t where t.worker.id = ?1 and t.campaign.id = ?2 and t.campaign.master.id = ?3 and t.type like 'selection'");
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
        Query q = em.createQuery("SELECT t from Task t where t.worker.id = ?1 and t.campaign.id = ?2 and t.campaign.master.id = ?3 and t.type like 'annotation'");
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
    public void createSelectionTaskForWorkerForCampaign(Master m,Worker w, Campaign c){
        if(getWorkerSelectionTaskForCampaign(w.getId(),m.getId(),c.getId()) == null){
                    Task st = new Task(Task.CLOSED,w,c,"selection");
                    em.persist(st);
                }
      //  else
        //    throw  new TaskAlreadyDefinedException();
    }
    @Override
    public void deleteSelectionTaskForWorkerForCampaign(Master m,Worker w, Campaign c){
        Task st = getWorkerSelectionTaskForCampaign(w.getId(),m.getId(),c.getId()) ;
         if(st != null){
                    em.remove(st);
                }
       // else
        //    throw  new TaskAlreadyDefinedException();
    }
    
    @Override
    public void createAnnotationTaskForWorkerForCampaign(Master m,Worker w, Campaign c){
        if(getWorkerAnnotationTaskForCampaign(w.getId(),m.getId(),c.getId()) == null){
                    Task at = new Task(Task.CLOSED,w,c,"annotation");
                    em.persist(at);
                }
        //else
         //   throw  new TaskAlreadyDefinedException();
    }
    @Override
    public void deleteAnnotationTaskForWorkerForCampaign(Master m,Worker w, Campaign c){
         Task at = getWorkerAnnotationTaskForCampaign(w.getId(),m.getId(),c.getId()) ;
         if(at != null){
                    em.remove(at);
                }
        //else
         //   throw  new TaskAlreadyDefinedException();
    }
    
    @Override
    public List<Task> getTasksForWorker(Worker w){
        /*Query q1 = em.createQuery("SELECT t from SelectionTask t where t.worker.id = ?1");
        q1.setParameter(1,w.getId());
        List<Task> temp1 =  q1.getResultList();
        Query q2 = em.createQuery("SELECT t from AnnotationTask t where t.worker.id = ?1");
        q2.setParameter(1,w.getId());
        List<Task> temp2 =  q2.getResultList();
        temp1.addAll(temp2);
*/
        Query q1 = em.createQuery("SELECT t from Task t where t.worker.id = ?1");
        q1.setParameter(1,w.getId());
        List<Task> temp1 =  q1.getResultList();
        if(temp1.isEmpty())
            return null;
        else 
            return temp1;
        
    }
    
      @Override
    public Task getTaskInfos(Long taskId){
           /* ATTENTO: QUESTO CON EREDITARIETA' BITABELLA E' ERRATO!
        Query q1 = em.createQuery("SELECT t from SelectionTask t where t.id = ?1");
        q1.setParameter(1,taskId);
        List<Task> temp1 =  q1.getResultList();
        if(temp1.isEmpty()){
            Query q2 = em.createQuery("SELECT t from AnnotationTask t where t.id = ?1");
            q2.setParameter(1,taskId);
            List<Task> temp2 =  q2.getResultList();
            if(temp2.isEmpty())
                return null;
            else
                return temp2.get(0);
        } else
            return temp1.get(0);
    */
           return em.find(Task.class, taskId);
    }
    
    @Override
        public List<Task> getTasksForCampaign(Long campaignId){
            Query q = em.createQuery("select t from Task t where t.campaign.id = ?1");
            q.setParameter(1,campaignId);
            List<Task> temp = q.getResultList();
            if(temp.isEmpty())
                return null;
            else return temp;
        }

        @Override
     public String startWorkingSession(Long taskId){
          Query q = em.createQuery("select t from Task t where t.id = ?1");
          q.setParameter(1,taskId);
          List<Task> temp = q.getResultList();
          if(temp.isEmpty())
              return null;
          else 
          {
              Task t = temp.get(0);
              switch(t.getWorkingSession()){
                  case Task.OPENED: return Task.OPENED;//throw new WorkingSessionAlreadyOpenedException();
                  case Task.CLOSED:  t.setWorkingSession(Task.OPENED); return Task.OPENED;
                  case Task.FINISHED: return Task.FINISHED;
                  default: throw new IllegalStateException();
              }
           }
     }
     
     @Override
     public void closeWorkingSession(Long taskId){
          Query q = em.createQuery("select t from Task t where t.id = ?1");
          q.setParameter(1,taskId);
          List<Task> temp = q.getResultList();
          if(temp.isEmpty())
              return;
          else 
          {
              Task t = temp.get(0);
              switch(t.getWorkingSession()){
                  case Task.OPENED: t.setWorkingSession(Task.CLOSED); return;
                  case Task.CLOSED:  return;
                  case Task.FINISHED: return;
                  default: throw new IllegalStateException();
              }
           }
     }
     
     @Override
     public void finishWorkingSession(Long taskId){
          Query q = em.createQuery("select t from Task t where t.id = ?1");
          q.setParameter(1,taskId);
          List<Task> temp = q.getResultList();
          if(temp.isEmpty())
              return;
          else 
          {
              Task t = temp.get(0);
              switch(t.getWorkingSession()){
                  case Task.OPENED: t.setWorkingSession(Task.FINISHED); return;
                  case Task.CLOSED:  t.setWorkingSession(Task.FINISHED); return;
                  case Task.FINISHED: return;
                  default: throw new IllegalStateException();
              }
           }
     }
     
      @Override
     public String getTaskWorkingSession(Long taskId){
         Query q = em.createQuery("select t from Task t where t.id = ?1");
         q.setParameter(1, taskId);
         List<Task> t = q.getResultList();
         if(t.isEmpty())
             return null;
         else
             return t.get(0).getWorkingSession();
     
    }
    @Override 
    public Long getCurrentTaskInstance(Long taskId){
        Query q = em.createQuery("select t from Task t where t.id = ?1");
         q.setParameter(1, taskId);
         List<Task> t = q.getResultList();
         if(t.isEmpty())
             return null;
         else
             return t.get(0).getCurrentTaskInstance();
    }

    @Override 
    public void setCurrentTaskInstance(Long taskId, Long currentTaskInstanceId){ 
        Query q = em.createQuery("select t from Task t where t.id = ?1");
         q.setParameter(1, taskId);
         List<Task> t = q.getResultList();
         if(t.isEmpty())
             throw new TaskNotFoundException();
         else
             t.get(0).setCurrentTaskInstance(currentTaskInstanceId);
    }
     
    
}
