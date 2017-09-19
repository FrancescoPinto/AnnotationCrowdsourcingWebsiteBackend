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
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.AnnotationTaskInstanceRepository;
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
    
    @Override
    public List<TaskDTO> getTasks(User user){
         if(user instanceof Worker){
            List<Task> tl = taskRepository.getTasksForWorker((Worker) user);
            List<TaskDTO> temp = new ArrayList<>();
            if(tl != null){
                for(Task t:tl){
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
                    taskRepository.setCurrentTaskInstance(taskId, s.getId());
                    return new TaskInstanceDTO(Task.SELECTION, s.getImage().getCanonical(),null);
                }
                else if(t.getType().equals(Task.ANNOTATION)){
                    AnnotationTaskInstance a = atiRepository.getNextAnnotationTaskInstance(t); 
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
                stiRepository.setCurrentTaskInstanceResult(idCurrentTaskInstance,String.valueOf(accepted));
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
                    for(AnnotationTaskInstance a : t.getAnnotationTaskInstances()){
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
}
