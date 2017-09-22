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
import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public class TaskServiceImpl implements TaskService {
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

    
    @Override
    public List<TaskDTO> getTasksofStartedCampaigns(User user){
         if(user instanceof Worker){
            List<Task> tl = taskRepository.getTasksForWorker((Worker) user);
            List<TaskDTO> temp = new ArrayList<>();
            if(tl != null){
                for(Task t:tl){
                        if(t.getCampaign().getStatus().equals(Campaign.STARTED))
                        temp.add(TaskDTO.fromTaskToTaskDTO(t));
                        }
                return temp;
            }else
                return null;
            
        }
        else 
             throw new UserNotWorkerException();
    }
    
    @Override
     public TaskInfosDTO getTaskInfo(User user, Long taskId){
          if(user instanceof Worker){
            Task t = taskRepository.getTaskInfos(taskId);
            
          //  il problema è che lui ha due serie di id diversi per i diversi tipi di task ... ma la api mi passa solo l'id del task..."
           // quindi io vorrei un id unico TRA ENTRAMBE LE TABELLE!
            if(t != null){     
                return TaskInfosDTO.fromTasktoTaskInfosDTO(t);
            }else
                return null;
            
        }
        else 
             throw new UserNotWorkerException();
     }
     
     @Override
     public String startWorkingSession(User u,Long taskId){
          if(u instanceof Worker){
             return taskRepository.startWorkingSession(taskId);           
        }
        else 
             throw new UserNotWorkerException();
        
     }
     
     @Override
     public String getTaskWorkingSession(User u, Long taskId){
         if(u instanceof Worker){
             return taskRepository.getTaskWorkingSession(taskId);           
        }
        else 
             throw new UserNotWorkerException();
    }
     @Override
    public TaskInstanceDTO getNextTaskInstance(User u, Long taskId){
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
                    return new TaskInstanceDTO(Task.SELECTION, s.getImage().getCanonical(),null);
                }
                else if(t.getType().equals(Task.ANNOTATION)){
                    List<AnnotationTaskInstance> atis = t.getAnnotationTaskInstance();
                    List<AnnotationTaskInstance> temp = new ArrayList<>();
                    List<Image> selectedImages = campaignService.getSelectedImages(t.getCampaign()); //ricevi le immagini selezionate
                    //per le immagini selezionate cerchi le task instances nel nostro task che siano annotation non già fatte
                    if(!atis.isEmpty()){
                        for(AnnotationTaskInstance ati : atis){
                            if(!selectedImages.isEmpty()){
                                for(Image i: selectedImages)
                                    if(ati.getSkyline().equals(AnnotationTaskInstance.NOTALREADY) && i.getId()== ati.getImage().getId())
                                        temp.add(ati);
                            }else{
                                taskRepository.closeWorkingSession(taskId);
                                throw new  NoMoreTaskInstancesException();
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
                    return new TaskInstanceDTO(Task.ANNOTATION, a.getImage().getCanonical(),t.getCampaign().getAnnotationSize());
                }
                else throw new TaskNotFoundException(); 
            }
            else throw new TaskNotFoundException(); 
        }
        else throw new UserNotWorkerException();
    }
    
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
    public TaskStatisticsDTO getTaskStatistics(User u, Long taskId){
        if(u instanceof Worker){
            Task t = taskRepository.getTaskInfos(taskId);
            if(t == null)
                throw new TaskNotFoundException();
            else{
                if(t.getType().equals(t.SELECTION)){
                    int available = 0;
                    int accepted = 0;
                    int rejected = 0;
                    for(SelectionTaskInstance s : t.getSelectionTaskInstances()){
                        if(s.getSelected().equals(s.NOTALREADY))
                           available++;
                        if(s.getSelected().equals(s.ACCEPTED))
                            accepted++;
                        if(s.getSelected().equals(s.REJECTED))
                            rejected++;
                    }
                    return new TaskStatisticsDTO(available,accepted,rejected,null); 
                }else if(t.getType().equals(t.ANNOTATION)){
                    int available = 0;
                    int annotated = 0; 
                    for(AnnotationTaskInstance a : t.getAnnotationTaskInstance()){
                        if(a.getSkyline().equals(a.NOTALREADY))
                            available++;
                        else
                            annotated++;
                    }
                    return new TaskStatisticsDTO(available,null,null, annotated);
                }
                else throw new TaskNotFoundException();
            }
           
        }
        else throw new UserNotWorkerException();
    }
    
    @Override
    public void initializeTasks(User m,Campaign c){
        if(m instanceof Master){
        List<Task> tasks = taskRepository.getTasksForCampaign(c.getId());
        if(tasks.isEmpty())
            return;
        else
        {
            for(Task t: tasks){
                if(t.getType().equals(Task.ANNOTATION)){
                    List<Image> images = campaignRepository.getCampaignImages((Master) m, c.getId());
                    if(!images.isEmpty())          
                        for(Image i: images)
                             atiRepository.createAnnotationTaskInstance(i,t,AnnotationTaskInstance.NOTALREADY);               
                }
                if(t.getType().equals(Task.SELECTION)){
                    List<Image> images = campaignRepository.getCampaignImages((Master) m, c.getId());
                    if(!images.isEmpty())                                   
                        for(Image i: images)
                             stiRepository.createSelectionTaskInstance(i,t,SelectionTaskInstance.NOTALREADY);
                    }
                }
            }
        }  
        else throw new UserNotMasterException();
                    
    }
    
    @Override
    public void beforeLogoutCleaning(User user){
        if(user instanceof Worker){
            List<Task> tasks = taskRepository.getTasksForWorker((Worker) user);
             if(tasks != null){
                for(Task t:tasks){
                    if(t.getCampaign().getStatus().equals(Campaign.STARTED)){
                    
                        taskRepository.closeWorkingSession(t.getId());
                    }
                }
             }
               //recupera i task, vedi quelli relativi alle campagne ancora aperte e che hanno aperto la sessione di lavoro, settagli la sessione a closed
            }
            else 
                 throw new UserNotWorkerException();
    }
    
   // @Override
    //public void finishTask
}
