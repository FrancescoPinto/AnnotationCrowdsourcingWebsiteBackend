/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.TaskDTO;
import awt.server.dto.TaskInfosDTO;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
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
}
