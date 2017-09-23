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
import awt.server.dto.ImageStatisticsDTO;
import awt.server.dto.NewCampaignDTO;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.CampaignsNotFoundException;
import awt.server.exceptions.ImageNotFoundException;
import awt.server.exceptions.PreconditionFailedException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatistics;
import awt.server.service.CampaignService;
import awt.server.service.UserService;
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
import awt.server.service.ImageService;
import org.springframework.validation.BindingResult;

/**
 *
 * @author Utente
 */
@RestController
public class CampaignController {
    @Autowired
    CampaignService campaignService;
    
    @Autowired
    ImageService imageStorageService;
    
    @Autowired
    UserService userService;
    
    
    @RequestMapping(value = "/api/campaign", method = RequestMethod.GET)
    public ResponseEntity getMasterCampaigns(@RequestHeader("Authorization") String APIToken){
        try{
                User authUser = userService.getUser(APIToken); 
                List<Campaign> temp = campaignService.getMasterCampaigns(authUser);
                List<CampaignDTO> tempDTO = new ArrayList<>();
                for(Campaign c: temp){
                    tempDTO.add(CampaignDTO.fromCampaignToCampaignDTO(c));
                }
                return ResponseEntity.ok().body(new CampaignListDTO(tempDTO));
       // il caso senza campagne?
        }catch(IOException | URISyntaxException |UserNotMasterException e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignsNotFoundException e){
            return ResponseEntity.ok().body("{\"campaigns\":[]}");        }

    }
    
    @RequestMapping(value = "/api/campaign", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createCampaign(@RequestHeader("Authorization") String APIToken, @Valid @RequestBody  NewCampaignDTO newCampaign, BindingResult result){
        try{
            if(result.hasErrors())
                return ResponseEntity.badRequest().body(null);
            else{
                User authUser = userService.getUser(APIToken);        
                Campaign temp = new Campaign(newCampaign,"ready",(Master) authUser);
                Campaign campaign = campaignService.createCampaign(authUser, temp);
                return ResponseEntity.ok().header("Location", "/api/campaign/"+campaign.getId()).body(null);
            }
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
      
    @RequestMapping(value = "/api/campaign/{id}", method = RequestMethod.GET)
    public ResponseEntity getCampaignDetails(@PathVariable("id") Long id,@RequestHeader("Authorization") String APIToken){
        try{
            
                User authUser = userService.getUser(APIToken);
                Campaign campaign = campaignService.getCampaignDetails(id, authUser);
                System.out.println(campaign.getId());
                return ResponseEntity.ok().body(CampaignInfoDTO.fromCampaignToCampaignInfoDTO(campaign));
     
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException e){
            return ResponseEntity.notFound().build();
        }

    }
    
       @RequestMapping(value = "/api/campaign/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity editCampaign(
            @RequestHeader("Authorization") String APIToken,
            @Valid @RequestBody  EditCampaignDTO newInfo,
            @PathVariable("id") Long id){
        try{
            
                User authUser = userService.getUser(APIToken);
                campaignService.editCampaign((Master) authUser,id,newInfo.getName(),newInfo.getSelection_replica(), newInfo.getThreshold(), newInfo.getAnnotation_replica(), newInfo.getAnnotation_size() );
                return ResponseEntity.ok().body(null);
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException e){
            return ResponseEntity.notFound().build();
        }

    }
    
    
    
    // /api/campaign/{id-Campaign}/execution per start/terminate
    
     @RequestMapping(value = "/api/campaign/{campaignId}/execution", method = RequestMethod.POST)
    public ResponseEntity startCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                campaignService.startCampaign(authUser, campaignId);         
                return ResponseEntity.ok().body(null);                 
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException e){
            return ResponseEntity.notFound().build();
        }catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
    
      @RequestMapping(value = "/api/campaign/{campaignId}/execution", method = RequestMethod.DELETE)
    public ResponseEntity terminateCampaign(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                campaignService.terminateCampaign(authUser, campaignId);         
                return ResponseEntity.ok().body(null);
                           
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException e){
            return ResponseEntity.notFound().build();
        }catch(CampaignNotReadyException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
    

    @RequestMapping(value = "/api/campaign/{campaignId}/statistics", method = RequestMethod.GET)
    public ResponseEntity getCampaignImageStatistics(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId
  
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                ImageStatistics i = campaignService.getCampaignImageStatistics(authUser, campaignId);    
                ImageStatisticsDTO isDTO = new ImageStatisticsDTO(i);
                return ResponseEntity.ok().body(isDTO);

        
        }catch(IOException | URISyntaxException |UserNotMasterException|ImageNotFoundException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(PreconditionFailedException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
 
}
