/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.Task;
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
public interface TaskRepository {
    public Task getWorkerSelectionTaskForCampaign(Long workerId, Long masterId, Long campaignId);
    public Task getWorkerAnnotationTaskForCampaign(Long workerId, Long masterId, Long campaignId);
    
    public void createSelectionTaskForWorkerForCampaign(Master m,Worker w, Campaign c);
    public void deleteSelectionTaskForWorkerForCampaign(Master m,Worker w, Campaign c);
    public void createAnnotationTaskForWorkerForCampaign(Master m,Worker w, Campaign c);
    public void deleteAnnotationTaskForWorkerForCampaign(Master m,Worker w, Campaign c);
    
    public List<Task> getTasksForWorker(Worker w);
    public List<Task> getTasksForCampaign(Long CampaignId);
    
    public Task getTaskInfos(Long taskId);

     public String startWorkingSession(Long taskId);
     public String getTaskWorkingSession(Long taskId);
     public Long getCurrentTaskInstance(Long taskId);
     public void setCurrentTaskInstance(Long taskId, Long currentTaskId);
}
