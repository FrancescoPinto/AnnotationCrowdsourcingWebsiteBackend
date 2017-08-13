/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Task;
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
    
    public void createSelectionTaskForWorkerForCampaign(Long workerId, Long masterId, Long campaignId);
    public void deleteSelectionTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);
    public void createAnnotationTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);
    public void deleteAnnotationTaskForWorkerForCampaign(Long workerId,Long masterId,Long campaignId);

}
