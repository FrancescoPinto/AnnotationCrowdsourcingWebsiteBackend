/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.ErrorDTO;
import awt.server.dto.ErrorMapDTO;
import awt.server.dto.TaskInstanceDTO;
import awt.server.dto.TaskResultAnnotationDTO;
import awt.server.dto.TaskResultSelectionDTO;
import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.convenience.TaskInstance;
import awt.server.service.TaskInstanceService;
import awt.server.service.TaskService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.hibernate.validator.internal.engine.path.PathImpl;
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
    
    @Autowired
    private Validator validator;
    
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
                                TaskInstance ti = taskInstanceService.getNextTaskInstance(authUser,taskId);
                                return ResponseEntity.ok().body(new TaskInstanceDTO(ti));
                            case Task.CLOSED: 
                                return ResponseEntity.status(410).build();
                            case Task.FINISHED: 
                                return ResponseEntity.notFound().build();
                            default: return ResponseEntity.badRequest().build();
                        }


                }catch(NoMoreTaskInstancesException|TaskNotFoundException e){
                    try{
                    User authUser = userService.getUser(APIToken);
                    taskService.closeWorkingSession(authUser);
                    return ResponseEntity.status(404).build();
                    } catch(IOException | URISyntaxException |UserNotWorkerException ex)
                    {
                     return ResponseEntity.badRequest().body(new ErrorDTO(ex.getMessage()));
                    }catch(RuntimeException ex)
                    {
                     return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
                    }
                }
                catch(IOException | URISyntaxException |UserNotWorkerException e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(RuntimeException ex)
                    {
                     return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
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
    
         Set<ConstraintViolation<TaskResultSelectionDTO>> constraintViolations = validator.validate( trs );
        if(constraintViolations.isEmpty()){
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
            
            }else{
           ErrorMapDTO temp = new ErrorMapDTO();
           for(ConstraintViolation<TaskResultSelectionDTO> cv: constraintViolations){
              temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
              
           }
          return ResponseEntity.badRequest().body(temp);
       }
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session/annotation", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @RequestBody(required = false) TaskResultAnnotationDTO tra
            ){
    
         Set<ConstraintViolation<TaskResultAnnotationDTO>> constraintViolations = validator.validate( tra );
        if(constraintViolations.isEmpty()){
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
            
              }else{
           ErrorMapDTO temp = new ErrorMapDTO();
           for(ConstraintViolation<TaskResultAnnotationDTO> cv: constraintViolations){
              temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
              
           }
          return ResponseEntity.badRequest().body(temp);
       }
    }
}
