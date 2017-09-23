/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.exceptions.CampaignNotClosedException;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.CampaignNotStartedException;
import awt.server.exceptions.CampaignsNotFoundException;
import awt.server.exceptions.PreconditionFailedException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatistics;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import awt.server.respository.WorkerRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Component
@Transactional
public class CampaignServiceImpl implements CampaignService{
    @Autowired
    CampaignRepository campaignRepository;
    
    @Autowired
    WorkerRepository workerRepository;
    
    @Autowired
    TaskRepository taskRepository;
    
    @Autowired
    SelectionTaskInstanceRepository stiRepository;
    
    @Autowired
    AnnotationTaskInstanceRepository atiRepository;
    
    @Autowired
    TaskService taskService;
    
    @Autowired
    ImageService imageService;
    
    
    @Override
    public List<Campaign> getMasterCampaigns(User user) throws UserNotMasterException{
        if(user instanceof Master){
            List<Campaign> temp = campaignRepository.getMasterCampaigns((Master) user);
            if(temp.isEmpty())
                throw new CampaignsNotFoundException();
            else return temp;
        }
        else throw new UserNotMasterException();
                 
    }
    
    @Override
    public Campaign createCampaign(User user,Campaign campaign){
        if(user instanceof Master)
            return campaignRepository.createCampaign(campaign);
         else throw new UserNotMasterException();
    }
    
    @Override
    public Campaign getCampaignDetails(Long campaignId,User user){
         if(user instanceof Master){
        
            Campaign c =  campaignRepository.getCampaignDetails(campaignId,(Master) user);
            if(c == null)
                throw new CampaignNotFoundException();
            else
                return c; 
         }
        else throw new UserNotMasterException();
        
    }
    
    @Override
    public void editCampaign(User user, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize){
        if(user instanceof Master){
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
            if(c == null)
                throw new CampaignNotFoundException();
            else
                campaignRepository.editCampaign((Master) user,c,name, selectRepl, thr, annRepl, annSize);
        }
        else throw new UserNotMasterException();
    }

   
    
    @Override
    public void startCampaign(User user,Long campaignId){
        if(user instanceof Master){
            try{
                Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
                if(c.getStatus().equals("ready")){
               //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (AVVIA CAMPAGNE CHE ESISTONO)
               campaignRepository.startCampaign((Master) user, c);
               //inizializza i task
               taskService.initializeTasks(user,c);
                }
                else
                    throw new CampaignNotReadyException();
              }catch(NullPointerException e){
                throw new CampaignNotFoundException();
              }
        }
        else throw new UserNotMasterException();
    }
    @Override
    public void terminateCampaign(User user,Long campaignId){
        if(user instanceof Master){
            try{
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
             if(c.getStatus().equals("started"))
             //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (TERMINA CAMPAGNE CHE SONO GIA' INIZIATE!!!)
             campaignRepository.terminateCampaign((Master) user, c);
             else
                 throw new CampaignNotStartedException();
            }catch(NullPointerException e){
                throw new CampaignNotFoundException();
            }

        }
        else throw new UserNotMasterException();
    }
    
   
  
           @Override
        public ImageStatistics getCampaignImageStatistics(User u, Long campaignId){
         if(u instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master)u);
             if(c.getStatus().equals("ended")){
                 
                 try{
                    // List<Task> ts = taskRepository.getTasksForCampaign(campaignId);
                    // for(Task t: ts){
                    List<SelectionTaskInstance> sti = stiRepository.getSelectionTaskInstancesOfCampaign(campaignId);
                    List<AnnotationTaskInstance> ati = atiRepository.getAnnotationTaskInstancesOfCampaign(campaignId);
                    int numannot = 0;
                    for(AnnotationTaskInstance a : ati){
                            if(!a.getSkyline().equals(AnnotationTaskInstance.NOTALREADY))
                                numannot++;
                    }

                    int numaccept = 0;
                    int numrej = 0;
                    List<Image> selectedImages = imageService.getSelectedImages(c);

                    /*for(SelectionTaskInstance s: sti){
                        if(s.getSelected().equals("accepted"))
                            numaccept++;
                        else if(s.getSelected().equals("rejected"))
                            numrej++;
                    }*/

                    int numImg = 0;
                    List<Image> i = imageService.getCampaignImages((Master)u, campaignId);
                    if(i != null)
                        numImg = i.size();

                    if(selectedImages.isEmpty()){
                        numrej = numImg;
                    }else
                    {
                        numaccept = selectedImages.size();
                        numrej = numImg - numaccept;
                    }

                    return new ImageStatistics(numImg,numaccept,numrej,numannot);
                 }
                 catch(NullPointerException|ArrayIndexOutOfBoundsException e){
                     throw new PreconditionFailedException("Unable to compute ImageStatistics due to precondition failed");            
                 }
             }
             else throw new CampaignNotClosedException();
          
          }
          else throw new UserNotMasterException();
    }
 
}
