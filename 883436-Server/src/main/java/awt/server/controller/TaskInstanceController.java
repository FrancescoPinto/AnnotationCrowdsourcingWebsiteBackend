/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.ErrorDTO;
import awt.server.dto.TaskInstanceDTO;
import awt.server.dto.TaskResultAnnotationDTO;
import awt.server.dto.TaskResultSelectionDTO;
import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.service.TaskInstanceService;
import awt.server.service.TaskService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import javax.validation.Valid;
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
public class TaskInstanceController {
    
    @Autowired
    TaskService taskService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    TaskInstanceService taskInstanceService;
      
       @RequestMapping(value = "/api/task/{taskId}/session", method = RequestMethod.GET)
    public ResponseEntity getNextTaskInstance(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId
            ){
    
            try{

                        User authUser = userService.getUser(APIToken);
      
                       // TaskInstanceDTO taskInstance = taskService.getNextTaskInstance(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        
                        switch(workingSession){
                            case Task.OPENED: 
                                return ResponseEntity.ok().body(new TaskInstanceDTO(taskInstanceService.getNextTaskInstance(authUser,taskId)));
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }


                }catch(NoMoreTaskInstancesException|TaskNotFoundException e){
                    return ResponseEntity.status(404).build();
                }
                catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }
    
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session/selection", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @Valid @RequestBody(required = false) TaskResultSelectionDTO trs//("accepted"/*, required = false*/) TaskResultSelectionDTO trs
            //HttpServletRequest request
            ){
    
            try{

                        User authUser = userService.getUser(APIToken);
                    
                       // TaskInstanceDTO taskInstance = taskService.getNextTaskInstance(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO

                        switch(workingSession){
                            case Task.OPENED: 
                                if(trs != null){
                                     taskInstanceService.setCurrentInstanceResult(authUser,taskId, trs.getAccepted());
                                     return ResponseEntity.ok().body(null);
                                }else return ResponseEntity.badRequest().build();
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
              

                }catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(TaskNotFoundException e){
                    return ResponseEntity.notFound().build();
                }
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session/annotation", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @Valid @RequestBody(required = false) TaskResultAnnotationDTO tra
            ){
    
            try{
                    
                        User authUser = userService.getUser(APIToken);
               
                         String workingSession = taskService.getTaskWorkingSession(authUser,taskId);  //DA SOSTITUIRE CON QUALCOSA DI VERO
                        switch(workingSession){
                            case Task.OPENED: 
                                if(tra != null){
                                     taskInstanceService.setCurrentInstanceResult(authUser,taskId,tra.getSkyline());//.getSkyline());
                                     return ResponseEntity.ok().body(null);
                                }else return ResponseEntity.badRequest().build();
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }
 
                  
                }catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(TaskNotFoundException e){
                    return ResponseEntity.notFound().build();
                }
    }
}
