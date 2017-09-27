/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Image;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */

@Repository
public interface SelectionTaskInstanceRepository {
    
        public List<SelectionTaskInstance> getSelectionTaskInstancesForImageOfCampaign(Long imageId);
        public List<SelectionTaskInstance> getSelectionTaskInstancesOfCampaign(Long campaignId);
        public SelectionTaskInstance getNextSelectionTaskInstance(Task t);
        public void setCurrentTaskInstanceResult(Long currentTaskInstanceId, String selected);
        public void createSelectionTaskInstance(Image i,Task t, String status);

}
