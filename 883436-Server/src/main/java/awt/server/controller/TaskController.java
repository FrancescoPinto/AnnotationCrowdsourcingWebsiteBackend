/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.ErrorDTO;
import awt.server.dto.TaskInfosDTO;
import awt.server.dto.TaskStatisticsDTO;
import awt.server.dto.TasksDTO;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.exceptions.WorkingSessionAlreadyOpenedException;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.convenience.TaskInfos;
import awt.server.model.convenience.TaskSimplified;
import awt.server.model.convenience.TaskStatistics;
import awt.server.service.TaskService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Utente
 */
@RestController
public class TaskController {
    
    @Autowired
    TaskService taskService;
    
      @Autowired
      UserService userService;
    
      @RequestMapping(value = "/api/task", method = RequestMethod.GET)
    public ResponseEntity getTasks(
            @RequestHeader("Authorization") String APIToken
            ){
        try{
            
               
                List<TaskSimplified> tasks = taskService.getTasksofStartedCampaigns(APIToken);  
                    if(tasks == null){
                        return ResponseEntity.ok().body("{\"tasks\":[]}");
                    }else
                                
                        return ResponseEntity.ok().body(new TasksDTO(tasks));      
        
        }catch(IOException | URISyntaxException |UserNotWorkerException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
   
    
    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.GET)
    public ResponseEntity getTaskInformation(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{

                        TaskInfos ti = taskService.getTaskInfo(APIToken,taskId);  
                        TaskInfosDTO t = new TaskInfosDTO(ti);
                        return ResponseEntity.ok().body(t);
                      

                }catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(TaskNotFoundException e){
                    return ResponseEntity.notFound().build();
                }
    
    
    
    }
    
       @RequestMapping(value = "/api/task/{taskId}/session", method = RequestMethod.POST)
       @Transactional
    public ResponseEntity getTaskSession(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{

               
                      
                        String workingSession = taskService.startWorkingSession(APIToken,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        
                        switch(workingSession){
                            case Task.OPENED: 
                                return ResponseEntity.ok().body(null);
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
                }catch(IOException | URISyntaxException |UserNotWorkerException|IllegalStateException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch (WorkingSessionAlreadyOpenedException e){
                    return ResponseEntity.status(410).build();
                }
    
    
    
    }
    
   
    
      @RequestMapping(value = "/api/task/{taskId}/statistics", method = RequestMethod.GET)
    public ResponseEntity getTaskStatistics (
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{
                       //#available
                       //#accepted //only selection
                       //#rejected //only selection
                       //#annotated //only annotation
                        TaskStatistics ts = taskService.getTaskStatistics(APIToken, taskId);
                        TaskStatisticsDTO t = new TaskStatisticsDTO(ts);       
                        return ResponseEntity.ok().body(t);
                        
                }catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(TaskNotFoundException e){
                    return ResponseEntity.notFound().build();
                }
    
    }
    
   
}
