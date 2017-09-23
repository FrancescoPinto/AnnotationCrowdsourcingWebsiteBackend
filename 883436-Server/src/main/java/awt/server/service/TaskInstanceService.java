/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.User;
import awt.server.model.convenience.TaskInstance;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Component
@Transactional
public interface TaskInstanceService {
     public TaskInstance getNextTaskInstance(User u, Long taskId);
    
    public void setCurrentInstanceResult(User u, Long taskId, String skyline);
    public void setCurrentInstanceResult(User u, Long taskId, Boolean accepted);
}
