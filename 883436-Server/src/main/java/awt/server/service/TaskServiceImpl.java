/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

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
import awt.server.model.convenience.TaskInfos;
import awt.server.model.convenience.TaskSimplified;
import awt.server.model.convenience.TaskStatistics;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.ImageRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import java.io.IOException;
import java.net.URISyntaxException;
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
    
    @Autowired
    ImageRepository imageRepository;
    
    @Autowired
    UserService userService;

    
    @Override
    public List<TaskSimplified> getTasksofStartedCampaigns(String APIToken) throws IOException, URISyntaxException{
         User user = userService.getUser(APIToken); 
         if(user instanceof Worker){
            List<Task> tl = taskRepository.getTasksForWorker((Worker) user);
            List<TaskSimplified> temp = new ArrayList<>();
            if(tl != null){
                for(Task t:tl){
                        if(t.getCampaign().getStatus().equals(Campaign.STARTED))
                        temp.add(TaskSimplified.fromTaskToTaskSimplified(t));
                        }
                return temp;
            }else
                return null;
            
        }
        else 
             throw new UserNotWorkerException();
    }
    
    @Override
     public TaskInfos getTaskInfo(String APIToken, Long taskId)throws IOException, URISyntaxException{
                  User user = userService.getUser(APIToken); 
 
         if(user instanceof Worker){
            Task t = taskRepository.getTaskInfos(taskId);
            
          //  il problema è che lui ha due serie di id diversi per i diversi tipi di task ... ma la api mi passa solo l'id del task..."
           // quindi io vorrei un id unico TRA ENTRAMBE LE TABELLE!
            if(t != null){     
                return TaskInfos.fromTasktoTaskInfos(t);
            }else
                throw new TaskNotFoundException();
            
        }
        else 
             throw new UserNotWorkerException();
     }
     
     @Override
     public String startWorkingSession(String APIToken,Long taskId)throws IOException, URISyntaxException{
                  User u = userService.getUser(APIToken); 

          if(u instanceof Worker){
             return taskRepository.startWorkingSession(taskId);           
        }
        else 
             throw new UserNotWorkerException();
        
     }
     
     @Override
     public String getTaskWorkingSession(String APIToken, Long taskId)throws IOException, URISyntaxException{
                  User u = userService.getUser(APIToken); 

         if(u instanceof Worker){
             return taskRepository.getTaskWorkingSession(taskId);           
        }
        else 
             throw new UserNotWorkerException();
    }
    
    
    
    @Override
    public TaskStatistics getTaskStatistics(String APIToken, Long taskId) throws IOException, URISyntaxException{
                 User u = userService.getUser(APIToken); 

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
                    return new TaskStatistics(available,accepted,rejected,null); 
                }else if(t.getType().equals(t.ANNOTATION)){
                    int available = 0;
                    int annotated = 0; 
                    for(AnnotationTaskInstance a : t.getAnnotationTaskInstance()){
                        if(a.getSkyline().equals(a.NOTALREADY))
                            available++;
                        else
                            annotated++;
                    }
                    return new TaskStatistics(available,null,null, annotated);
                }
                else throw new TaskNotFoundException();
            }
           
        }
        else throw new UserNotWorkerException();
    }
    
    @Override
    public void initializeTasks(String APIToken,Campaign c)throws IOException, URISyntaxException{
                 User m = userService.getUser(APIToken); 

        if(m instanceof Master){
        List<Task> tasks = taskRepository.getTasksForCampaign(c.getId());
        if(tasks.isEmpty())
            return;
        else
        {
            for(Task t: tasks){
                if(t.getType().equals(Task.ANNOTATION)){
                    List<Image> images = imageRepository.getCampaignImages((Master) m, c.getId());
                    if(!images.isEmpty())          
                        for(Image i: images)
                             atiRepository.createAnnotationTaskInstance(i,t,AnnotationTaskInstance.NOTALREADY);               
                }
                if(t.getType().equals(Task.SELECTION)){
                    List<Image> images = imageRepository.getCampaignImages((Master) m, c.getId());
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
    public void beforeLogoutCleaning(String APIToken)throws IOException, URISyntaxException{
        closeWorkingSession(APIToken);
        /*if(user instanceof Worker){
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
                 throw new UserNotWorkerException();*/
    }
    
     @Override
    public void closeWorkingSession(String APIToken)throws IOException, URISyntaxException{
                 User user = userService.getUser(APIToken); 

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
