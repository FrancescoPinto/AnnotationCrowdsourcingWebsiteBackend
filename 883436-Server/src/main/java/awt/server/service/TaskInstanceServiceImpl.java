/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Image;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.model.convenience.TaskInstance;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.ImageRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */

@Service
@Transactional(propagation=Propagation.REQUIRED)
public class TaskInstanceServiceImpl implements TaskInstanceService {
    
       @Autowired
    TaskRepository taskRepository;
    
    @Autowired
    SelectionTaskInstanceRepository stiRepository;
    
    @Autowired
    AnnotationTaskInstanceRepository atiRepository;
    
    @Autowired
    CampaignRepository campaignRepository;
    
    @Autowired
    CampaignService campaignService;
    
    @Autowired
    ImageRepository imageRepository;
    
    @Autowired
    ImageService imageService;
    
    @Override
    public void setCurrentInstanceResult(User u, Long taskId, String skyline){
        if(u instanceof Worker){
            Long idCurrentTaskInstance = taskRepository.getCurrentTaskInstance(taskId);
            if(idCurrentTaskInstance != null){
                atiRepository.setCurrentTaskInstanceResult(idCurrentTaskInstance,skyline);
            }
            else throw new TaskNotFoundException(); 
        }
        else throw new UserNotWorkerException();
    } 
    @Override
    public void setCurrentInstanceResult(User u, Long taskId, Boolean accepted){
         if(u instanceof Worker){
            Long idCurrentTaskInstance = taskRepository.getCurrentTaskInstance(taskId);
            if(idCurrentTaskInstance != null){
                stiRepository.setCurrentTaskInstanceResult(idCurrentTaskInstance,accepted?SelectionTaskInstance.ACCEPTED:SelectionTaskInstance.REJECTED);
            }
            else throw new TaskNotFoundException(); 
        }
        else throw new UserNotWorkerException();
    };
    
     @Override
    public TaskInstance getNextTaskInstance(User u, Long taskId){
        if(u instanceof Worker){
            Task t = taskRepository.getTaskInfos(taskId);
            if(t != null){
            
                if(t.getType().equals(Task.SELECTION)){
                    SelectionTaskInstance s = stiRepository.getNextSelectionTaskInstance(t);
                    if(s == null){
                        
                        taskRepository.closeWorkingSession(taskId);
                        throw new NoMoreTaskInstancesException();
                    }
                    taskRepository.setCurrentTaskInstance(taskId, s.getId());
                    return new TaskInstance(Task.SELECTION, s.getImage().getCanonical(),null);
                }
                else if(t.getType().equals(Task.ANNOTATION)){
                    List<AnnotationTaskInstance> atis = t.getAnnotationTaskInstance();
                    List<AnnotationTaskInstance> temp = new ArrayList<>();
                    List<Image> selectedImages = imageService.getSelectedImages(t.getCampaign()); //ricevi le immagini selezionate
                    //per le immagini selezionate cerchi le task instances nel nostro task che siano annotation non già fatte
                    if(!atis.isEmpty()){
                        for(AnnotationTaskInstance ati : atis){
                            if(!selectedImages.isEmpty()){
                                for(Image i: selectedImages)
                                    if(ati.getSkyline().equals(AnnotationTaskInstance.NOTALREADY) && i.getId()== ati.getImage().getId())
                                        temp.add(ati);
                            }else{
                                taskRepository.closeWorkingSession(taskId);
                                throw new  RuntimeException("Annotation tasks not available at the moment");
                            }
                        }
                    } else{ 
                        taskRepository.closeWorkingSession(taskId);
                        throw new NoMoreTaskInstancesException();
                    }
                    
                    
                    
                     if(temp.isEmpty()){
                        taskRepository.closeWorkingSession(taskId);
                        throw new NoMoreTaskInstancesException();
                     }
                     
                     AnnotationTaskInstance a = temp.get(0);
                    taskRepository.setCurrentTaskInstance(taskId, a.getId());
                    return new TaskInstance(Task.ANNOTATION, a.getImage().getCanonical(),t.getCampaign().getAnnotationSize());
                }
                else throw new TaskNotFoundException(); 
            }
            else throw new TaskNotFoundException(); 
        }
        else throw new UserNotWorkerException();
    }
    
}
