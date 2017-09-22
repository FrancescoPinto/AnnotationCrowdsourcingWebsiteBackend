/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.ErrorDTO;
import awt.server.dto.TaskDTO;
import awt.server.dto.TaskInfosDTO;
import awt.server.dto.TaskResultAnnotationDTO;
import awt.server.dto.TaskResultSelectionDTO;
import awt.server.dto.TasksDTO;
import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.exceptions.WorkingSessionAlreadyOpenedException;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.service.JwtService;
import awt.server.service.TaskService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
    private JwtService jwt;
      
      @Autowired
      UserService userService;
    
      @RequestMapping(value = "/api/task", method = RequestMethod.GET)
    public ResponseEntity getTasks(
            @RequestHeader("Authorization") String APIToken
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                if(authUser instanceof Worker){
                List<TaskDTO> tasks = taskService.getTasksofStartedCampaigns(authUser);  
                    if(tasks == null){
                        return ResponseEntity.ok().body("{\"tasks\":[]}");
                    }else
                                
                        return ResponseEntity.ok().body(new TasksDTO(tasks));
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
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

                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                        TaskInfosDTO tasks = taskService.getTaskInfo(authUser,taskId);  
                        return ResponseEntity.ok().body(tasks);
                        }
                        else throw new UserNotMasterException();


                }catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }
    
    
    
    }
    
       @RequestMapping(value = "/api/task/{taskId}/session", method = RequestMethod.POST)
    public ResponseEntity getTaskSession(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{

                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                        String workingSession = taskService.startWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        
                        switch(workingSession){
                            case Task.OPENED: 
                                return ResponseEntity.ok().body(null);
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
                       
                        }
                        else throw new UserNotMasterException();


                }catch(IOException | URISyntaxException |UserNotMasterException|IllegalStateException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch (WorkingSessionAlreadyOpenedException e){
                    return ResponseEntity.status(410).build();
                }
    
    
    
    }
    
      @RequestMapping(value = "/api/task/{taskId}/session", method = RequestMethod.GET)
    public ResponseEntity getNextTaskInstance(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{

                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                       // TaskInstanceDTO taskInstance = taskService.getNextTaskInstance(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        
                        switch(workingSession){
                            case Task.OPENED: 
                                return ResponseEntity.ok().body(taskService.getNextTaskInstance(authUser,taskId));
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
                        }
                        else throw new UserNotMasterException();


                }catch(NoMoreTaskInstancesException e){
                    return ResponseEntity.status(404).build();
                }
                catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }
    
    
    
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session/selection", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @RequestBody(required = false) TaskResultSelectionDTO trs//("accepted"/*, required = false*/) TaskResultSelectionDTO trs
            //HttpServletRequest request
            ){
    
            try{

                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                       // TaskInstanceDTO taskInstance = taskService.getNextTaskInstance(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO

                        switch(workingSession){
                            case Task.OPENED: 
                                if(trs != null){
                                     taskService.setCurrentInstanceResult(authUser,taskId, trs.getAccepted());
                                     return ResponseEntity.ok().body(null);
                                }else return ResponseEntity.badRequest().build();
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
                        }
                        else throw new UserNotMasterException();

                }catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session/annotation", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @RequestBody(required = false) TaskResultAnnotationDTO tra
            ){
    
            try{
                    
                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        switch(workingSession){
                            case Task.OPENED: 
                                if(tra != null){
                                     taskService.setCurrentInstanceResult(authUser,taskId,tra.getSkyline());//.getSkyline());
                                     return ResponseEntity.ok().body(null);
                                }else return ResponseEntity.badRequest().build();
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
                        }
                        else throw new UserNotMasterException();

                }catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
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
                        User authUser = userService.getUser(APIToken);
                        if(authUser instanceof Worker){
                           return ResponseEntity.ok().body(taskService.getTaskStatistics(authUser, taskId));
                        
                        }
                        else throw new UserNotMasterException();


                }catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }
    }
    
   
}
