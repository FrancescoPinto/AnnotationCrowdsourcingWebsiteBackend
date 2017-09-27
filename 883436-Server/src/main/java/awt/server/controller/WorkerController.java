/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.ErrorDTO;
import awt.server.dto.WorkerDTO;
import awt.server.dto.WorkerInfosDTO;
import awt.server.dto.WorkersDTO;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.exceptions.WorkerNotFound;
import awt.server.model.User;
import awt.server.service.CampaignService;
import awt.server.service.UserService;
import awt.server.service.WorkerService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
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
public class WorkerController {
    
    @Autowired
    CampaignService campaignService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    WorkerService workerService;
    
          @RequestMapping(value = "/api/campaign/{id}/worker", method = RequestMethod.GET)
    public ResponseEntity getWorkersForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("id") Long id){
        try{
            
                User authUser = userService.getUser(APIToken);
              
                List<awt.server.model.convenience.Worker> workers = workerService.getWorkersForCampaign(authUser, id);         
                return ResponseEntity.ok().body(new WorkersDTO(workers));
               
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
    
         @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}", method = RequestMethod.GET)
    public ResponseEntity getWorkerDataForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = userService.getUser(APIToken);
                awt.server.model.convenience.Worker w = workerService.getWorkerInfo(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(new WorkerInfosDTO(new WorkerDTO(w),"/api/campaign/"+campaignId+"/worker/"+workerId+"/selection","/api/campaign/"+campaignId+"/worker/"+workerId+"/annotation"));
          
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
             }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
    
     @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/selection", method = RequestMethod.POST)
    public ResponseEntity enableWorkerForSelectionForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = userService.getUser(APIToken);
    
                workerService.enableWorkerForSelectionForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/selection", method = RequestMethod.DELETE)
    public ResponseEntity disableWorkerForSelectionForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = userService.getUser(APIToken);
        
                workerService.disableWorkerForSelectionForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
                 
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/annotation", method = RequestMethod.POST)
    public ResponseEntity enableWorkerForAnnotationForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = userService.getUser(APIToken);
                workerService.enableWorkerForAnnotationForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
       
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/annotation", method = RequestMethod.DELETE)
    public ResponseEntity disableWorkerForAnnotationForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = userService.getUser(APIToken);
     
                workerService.disableWorkerForAnnotationForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        } catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotFoundException|WorkerNotFound e){
             return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

        }

    }
    
}
