/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.CampaignDTO;
import awt.server.dto.CampaignInfoDTO;
import awt.server.dto.CampaignListDTO;
import awt.server.dto.EditCampaignDTO;
import awt.server.dto.ErrorDTO;
import awt.server.dto.NewCampaignDTO;
import awt.server.dto.WorkerDTO;
import awt.server.dto.WorkerInfosDTO;
import awt.server.dto.WorkersDTO;
import awt.server.exceptions.UserNotLogged;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.service.CampaignService;
import awt.server.service.JwtService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
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
public class CampaignController {
    @Autowired
    CampaignService campaignService;
    
       
    @Autowired
    private JwtService jwt;
    
    
    @RequestMapping(value = "/api/campaign", method = RequestMethod.GET)
    public ResponseEntity getMasterCampaigns(@RequestHeader("Authorization") String APIToken){
        try{
                User authUser = getUser(APIToken); 
                List<Campaign> temp = campaignService.getMasterCampaigns(authUser);
                List<CampaignDTO> tempDTO = new ArrayList<>();
                for(Campaign c: temp){
                    tempDTO.add(CampaignDTO.fromCampaignToCampaignDTO(c));
                }
                return ResponseEntity.ok().body(new CampaignListDTO(tempDTO));
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    @RequestMapping(value = "/api/campaign", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createCampaign(@RequestHeader("Authorization") String APIToken, @Valid @RequestBody  NewCampaignDTO newCampaign){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                Campaign campaign = campaignService.createCampaign(new Campaign(newCampaign,"ready",(Master) authUser));
                return ResponseEntity.ok().header("Location", "/api/campaign/"+campaign.getId()).body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
      
    @RequestMapping(value = "/api/campaign/{id}", method = RequestMethod.GET)
    public ResponseEntity getCampaignDetails(@PathVariable("id") Long id,@RequestHeader("Authorization") String APIToken){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                Campaign campaign = campaignService.getCampaignDetails(id, authUser);
                return ResponseEntity.ok().body(CampaignInfoDTO.fromCampaignToCampaignInfoDTO(campaign));
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
       @RequestMapping(value = "/api/campaign/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity editUserCampaign(
            @RequestHeader("Authorization") String APIToken,
            @Valid @RequestBody  EditCampaignDTO newInfo,
            @PathVariable("id") Long id){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                campaignService.editCampaign((Master) authUser,id,newInfo.getName(),newInfo.getSelection_replica(), newInfo.getThreshold(), newInfo.getAnnotation_replica(), newInfo.getAnnotation_size() );
                return ResponseEntity.ok().body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    
          @RequestMapping(value = "/api/campaign/{id}/worker", method = RequestMethod.GET)
    public ResponseEntity getWorkers(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("id") Long id){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                List<WorkerDTO> workers = campaignService.getWorkersForCampaign(authUser, id);         
                return ResponseEntity.ok().body(new WorkersDTO(workers));
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    
         @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}", method = RequestMethod.GET)
    public ResponseEntity getWorkers(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                WorkerDTO w = campaignService.getWorkerInfo(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(new WorkerInfosDTO(w,"/api/campaign/"+campaignId+"/worker/"+workerId+"/selection","/api/campaign/"+campaignId+"/worker/"+workerId+"/annotation"));
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    
     @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/selection", method = RequestMethod.POST)
    public ResponseEntity enableWorkerForSelectionForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                WorkerDTO w = campaignService.enableWorkerForSelectionForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/selection", method = RequestMethod.DELETE)
    public ResponseEntity disableWorkerForSelectionForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                WorkerDTO w = campaignService.disableWorkerForSelectionForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/annotation", method = RequestMethod.POST)
    public ResponseEntity enableWorkerForAnnotationForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                WorkerDTO w = campaignService.enableWorkerForAnnotationForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    @RequestMapping(value = "/api/campaign/{campaignId}/worker/{workerId}/annotation", method = RequestMethod.DELETE)
    public ResponseEntity disableWorkerForAnnotationForCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("workerId") Long workerId){
        try{
            
                User authUser = getUser(APIToken);
                if(authUser instanceof Master){
                WorkerDTO w = campaignService.disableWorkerForAnnotationForCampaign(authUser, workerId, campaignId);         
                return ResponseEntity.ok().body(null);
                }
                else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    // /api/campaign/{id-Campaign}/execution per start/terminate
    
    
    private User getUser(String APIToken) throws UserNotLogged,IOException,URISyntaxException {
        User temp = jwt.verify(APIToken);
     
        if(temp == null){
            throw new UserNotLogged();
        }
        return temp;
    }
}
