/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Master;
import awt.server.model.Worker;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Repository
@Transactional
public class WorkerRepositoryImpl implements WorkerRepository {
    @PersistenceContext
    EntityManager em;
    
    @Override
     public List<Worker> getWorkers(){
         Query q = em.createNamedQuery("getWorkers");
         List<Worker> workers = q.getResultList();
         return workers;
     }
     
     @Override
     public Worker getWorkerInfo(Long id){
         Query q = em.createQuery("Select w from Worker w where w.id = ?1");
         q.setParameter(1,id);
         List<Worker> result = q.getResultList();
         if(result.isEmpty())
             return null;
         else return result.get(0);
   
     }
     
         @Override
    public Worker getWorkerById(Long id){
        return em.find(Worker.class,id);
    }
    
}
