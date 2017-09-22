/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Image;
import awt.server.model.Task;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Utente
 */
@Repository
public interface AnnotationTaskInstanceRepository {
    
        public List<AnnotationTaskInstance> getAnnotationTaskInstancesForImageOfCampaign(Long imageId);
        public List<AnnotationTaskInstance> getAnnotationTaskInstancesOfCampaign(Long campaignId);
        public AnnotationTaskInstance getNextAnnotationTaskInstance(Task t);
        public void setCurrentTaskInstanceResult(Long currentTaskInstanceId, String annotation);
        public void createAnnotationTaskInstance(Image i,Task t,String status);   
}
