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
import awt.server.dto.ErrorMapDTO;
import awt.server.dto.ImageStatisticsDTO;
import awt.server.dto.NewCampaignDTO;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.CampaignNotStartedException;
import awt.server.exceptions.CampaignsNotFoundException;
import awt.server.exceptions.PreconditionFailedException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatistics;
import awt.server.model.convenience.NewCampaign;
import awt.server.service.CampaignService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import awt.server.service.ImageService;
import java.net.URI;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.transaction.annotation.Transactional;

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
    
    @Autowired
    private Validator validator;
    
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
            return ResponseEntity.ok().body("{\"campaigns\":[]}");        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
    @RequestMapping(value = "/api/campaign", method = RequestMethod.POST, consumes = "application/json")
    @Transactional
    public ResponseEntity createCampaign(@RequestHeader("Authorization") String APIToken, @RequestBody  NewCampaignDTO newCampaign){
       
        Set<ConstraintViolation<NewCampaignDTO>> constraintViolations = validator.validate( newCampaign );
        if(constraintViolations.isEmpty()){
                try{

                        User authUser = userService.getUser(APIToken);        
                        if(!(authUser instanceof Master))
                            throw new UserNotMasterException();
                        NewCampaign temp = new NewCampaign(newCampaign);
                        Campaign campaign = campaignService.createCampaign(authUser, temp);
                        //return ResponseEntity.ok().header("Location", "/api/campaign/"+campaign.getId()).body(null);
                        URI location = new URI("/api/campaign/"+campaign.getId());
                        return ResponseEntity.created(location).build();

                }catch(IOException | URISyntaxException |UserNotMasterException e)
                {
                    e.printStackTrace();
                     return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                }catch(Exception e){
                     e.printStackTrace();
                    return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                   
                }
                
        }else{
           ErrorMapDTO temp = new ErrorMapDTO();
           for(ConstraintViolation<NewCampaignDTO> cv: constraintViolations){
              temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
              
           }
          return ResponseEntity.badRequest().body(temp);
       }
       /* }else{
          String name = null;
          String selection_replica = null;
          String threshold = null;
          String annotation_replica = null;
          String annotation_size = null;

        for(ConstraintViolation<NewCampaignDTO> cv: constraintViolations){
            if(((PathImpl)cv.getPropertyPath()).getLeafNode().getName().equals("name"))
                name = cv.getMessage();
             if(((PathImpl)cv.getPropertyPath()).getLeafNode().getName().equals("selection_replica"))
                selection_replica = cv.getMessage();
              if(((PathImpl)cv.getPropertyPath()).getLeafNode().getName().equals("threshold"))
                threshold = cv.getMessage();
               if(((PathImpl)cv.getPropertyPath()).getLeafNode().getName().equals("annotation_replica"))
                annotation_replica = cv.getMessage();
                if(((PathImpl)cv.getPropertyPath()).getLeafNode().getName().equals("annotation_size"))
                annotation_size = cv.getMessage();
        }
        return ResponseEntity.badRequest().body(new ErrorNewCampaignDTO(name,selection_replica,threshold,annotation_replica,annotation_size));
        }*/
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
            return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
       @RequestMapping(value = "/api/campaign/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity editCampaign(
            @RequestHeader("Authorization") String APIToken,
            @RequestBody  EditCampaignDTO newInfo,
            @PathVariable("id") Long id){
        Set<ConstraintViolation<EditCampaignDTO>> constraintViolations = validator.validate( newInfo );
        if(constraintViolations.isEmpty()){
            try{

                    User authUser = userService.getUser(APIToken);
                     if(!(authUser instanceof Master))
                        throw new UserNotMasterException();
                    campaignService.editCampaign((Master) authUser,id,newInfo.getName(),newInfo.getSelection_replica(), newInfo.getThreshold(), newInfo.getAnnotation_replica(), newInfo.getAnnotation_size() );
                    return ResponseEntity.ok().body(null);


            }catch(IOException | URISyntaxException |UserNotMasterException e)
            {
                 return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotFoundException e){
                return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
            }catch(CampaignNotReadyException e){
                return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
            }catch(Exception e){
                return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
            }
       }else{
           ErrorMapDTO temp = new ErrorMapDTO();
            for(ConstraintViolation<EditCampaignDTO> cv: constraintViolations){
                temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
            }
            return ResponseEntity.badRequest().body(temp);
        }

    }
    
    
    
    // /api/campaign/{id-Campaign}/execution per start/terminate
    
     @RequestMapping(value = "/api/campaign/{campaignId}/execution", method = RequestMethod.POST)
     @Transactional
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
            return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotReadyException|PreconditionFailedException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
      @RequestMapping(value = "/api/campaign/{campaignId}/execution", method = RequestMethod.DELETE)
      @Transactional
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
            return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotStartedException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
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

        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(PreconditionFailedException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotFoundException e){
            return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage()));
        
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
 
}
