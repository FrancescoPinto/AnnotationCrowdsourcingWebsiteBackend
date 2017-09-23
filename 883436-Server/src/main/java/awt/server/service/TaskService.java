 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.Campaign;
import awt.server.model.User;
import awt.server.model.convenience.TaskInfos;
import awt.server.model.convenience.TaskSimplified;
import awt.server.model.convenience.TaskStatistics;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service
@Transactional
public interface TaskService {
    public List<TaskSimplified> getTasksofStartedCampaigns(User u);
    public TaskInfos getTaskInfo(User user,Long taskId);
    public String startWorkingSession(User u, Long taskId);  
    public String getTaskWorkingSession(User u, Long taskId);
    
   
    public TaskStatistics getTaskStatistics(User u, Long taskId);
    public void initializeTasks(User m,Campaign c);
    public void beforeLogoutCleaning(User u);
}
