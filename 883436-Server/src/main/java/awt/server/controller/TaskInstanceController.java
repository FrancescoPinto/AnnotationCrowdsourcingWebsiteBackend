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
import awt.server.exceptions.FinishedWorkingSessionException;
import awt.server.exceptions.IllegalStateOfWorkingSession;
import awt.server.exceptions.NoMoreImagesToSelectException;
import awt.server.exceptions.NoMoreTaskInstancesException;
import awt.server.exceptions.NoSelectedImagesException;
import awt.server.exceptions.TaskNotFoundException;
import awt.server.exceptions.UserNotWorkerException;
import awt.server.model.convenience.TaskInstance;
import awt.server.service.TaskInstanceService;
import awt.server.service.TaskService;
import awt.server.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

                    TaskInstance ti = taskInstanceService.getNextTaskInstance(APIToken,taskId);
                    return ResponseEntity.ok().body(new TaskInstanceDTO(ti));
              
                }catch(NoMoreTaskInstancesException|TaskNotFoundException|NoSelectedImagesException e){
                        try{
                            //  User authUser = userService.getUser(APIToken);
                              taskService.closeWorkingSession(APIToken);
                              return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
                        } catch(IOException | URISyntaxException |UserNotWorkerException ex)
                        {
                         return ResponseEntity.badRequest().body(new ErrorDTO(ex.getMessage()));
                        }catch(RuntimeException ex)
                        {
                         return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
                        }
                }
                catch(IOException | URISyntaxException |UserNotWorkerException|FinishedWorkingSessionException|IllegalStateOfWorkingSession e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(RuntimeException ex){
                     return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
                }
    
    }
    
     @RequestMapping(value = "/api/task/{taskId}/session", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            //@RequestBody TaskResultDTO tr
            HttpServletRequest request
            ){
        TaskResultAnnotationDTO tra = null;
        TaskResultSelectionDTO trs =  null;
        try{
            String json = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            if(json.contains("skyline")){
                tra =  new ObjectMapper().readerFor(TaskResultAnnotationDTO.class).readValue(json); 
            }else{
                trs = new ObjectMapper().readerFor(TaskResultSelectionDTO.class).readValue(json); 
            }
        }catch(IOException e){
            ResponseEntity.badRequest().body(null);
        }
 
            if(trs != null){
                try{
                        taskInstanceService.setCurrentInstanceResult(APIToken,taskId, trs.getAccepted());
                        return ResponseEntity.ok().body(null);
                   }catch(IOException | URISyntaxException |UserNotWorkerException|FinishedWorkingSessionException|IllegalStateOfWorkingSession e){
                        return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                    }catch(TaskNotFoundException e){
                       return ResponseEntity.notFound().build();
                    }catch(RuntimeException ex){
                         return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
                    }

             
        }else if (tra != null){
            try{
                             
                taskInstanceService.setCurrentInstanceResult(APIToken,taskId,tra.getSkyline());//.getSkyline());
                return ResponseEntity.ok().body(null);

                }catch(IOException | URISyntaxException |UserNotWorkerException|FinishedWorkingSessionException|IllegalStateOfWorkingSession e)
                {
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(TaskNotFoundException e){
                    return ResponseEntity.notFound().build();
                }catch(RuntimeException ex){
                    return ResponseEntity.status(410).body(new ErrorDTO(ex.getMessage()));
                }
           
    }else return ResponseEntity.badRequest().build();
    
    
    /* @RequestMapping(value = "/api/task/{taskId}/session/annotation", method = RequestMethod.PUT)//, consumes = "application/json")
    public ResponseEntity setCurrentInstanceResult(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("taskId") Long taskId,
            //@RequestParam(name = "skyline", required = false) TaskResultAnnotationDTO tra,
            @RequestBody(required = false) TaskResultAnnotationDTO tra
            ){
    
       
       }*/
    }
}