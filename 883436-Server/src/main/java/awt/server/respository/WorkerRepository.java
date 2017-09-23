/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Worker;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Repository
@Transactional
public interface WorkerRepository {
    public List<Worker> getWorkers();
    public Worker getWorkerInfo(Long id);
     public Worker getWorkerById(Long id);
    
}
