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
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface TaskService {
    public List<TaskSimplified> getTasksofStartedCampaigns(String APIToken)throws IOException,URISyntaxException;
    public TaskInfos getTaskInfo(String APIToken,Long taskId) throws IOException,URISyntaxException;
    public String startWorkingSession(String APIToken, Long taskId)throws IOException,URISyntaxException;  
    public String getTaskWorkingSession(String APIToken, Long taskId)throws IOException,URISyntaxException;
    
   
    public TaskStatistics getTaskStatistics(String APIToken, Long taskId)throws IOException,URISyntaxException;
    public void initializeTasks(String APIToken,Campaign c)throws IOException,URISyntaxException;
    public void beforeLogoutCleaning(String APIToken)throws IOException,URISyntaxException;
    public void closeWorkingSession(String APIToken)throws IOException,URISyntaxException;
}
