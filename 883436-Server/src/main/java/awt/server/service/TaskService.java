 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.TaskDTO;
import awt.server.dto.TaskInfosDTO;
import awt.server.dto.TaskInstanceDTO;
import awt.server.dto.TaskStatisticsDTO;
import awt.server.model.User;
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
    public List<TaskDTO> getTasks(User u);
    public TaskInfosDTO getTaskInfo(User user,Long taskId);
    public String startWorkingSession(User u, Long taskId);  
    public String getTaskWorkingSession(User u, Long taskId);
    public TaskInstanceDTO getNextTaskInstance(User u, Long taskId);
    public void setCurrentInstanceResult(User u, Long taskId, String skyline);
    public void setCurrentInstanceResult(User u, Long taskId, Boolean accepted);
    public TaskStatisticsDTO getTaskStatistics(User u, Long taskId);
}
