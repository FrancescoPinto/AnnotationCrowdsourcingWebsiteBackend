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
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatistics;
import awt.server.model.convenience.NewCampaign;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import awt.server.respository.WorkerRepository;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service
@Transactional(propagation=Propagation.REQUIRED)
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
    
    @Autowired
    UserService userService;
    
    @Override
    public List<Campaign> getMasterCampaigns(String APIToken) throws IOException,URISyntaxException{
        User user = userService.getUser(APIToken);
        if(user instanceof Master){
            List<Campaign> temp = campaignRepository.getMasterCampaigns((Master) user);
            if(temp.isEmpty())
                throw new CampaignsNotFoundException();
            else return temp;
        }
        else throw new UserNotMasterException();
                 
    }
    
    @Override
    public Campaign createCampaign(String APIToken,NewCampaign campaign) throws IOException,URISyntaxException{
         User authUser = userService.getUser(APIToken);        
            if(!(authUser instanceof Master))
                throw new UserNotMasterException();
        if(authUser instanceof Master)
            return campaignRepository.createCampaign((Master) authUser,campaign);
         else throw new UserNotMasterException();
    }
    
    @Override
    public Campaign getCampaignDetails(Long campaignId,String APIToken) throws IOException,URISyntaxException{
         User authUser = userService.getUser(APIToken);
         if(authUser instanceof Master){
        
            Campaign c =  campaignRepository.getCampaignDetails(campaignId,(Master) authUser);
            if(c == null)
                throw new CampaignNotFoundException();
            else
                return c; 
         }
        else throw new UserNotMasterException();
        
    }
    
    @Override
    public void editCampaign(String APIToken, Long campaignId, String name, int selectRepl, int thr, int annRepl, int annSize)throws IOException, URISyntaxException{
           
            User authUser = userService.getUser(APIToken);
            if(!(authUser instanceof Master))
               throw new UserNotMasterException();
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) authUser);
            if(c == null)
                throw new CampaignNotFoundException();
            else if(c.getStatus().equals("ready"))
                campaignRepository.editCampaign((Master) authUser,c,name, selectRepl, thr, annRepl, annSize);
            else
                throw new CampaignNotReadyException();
      
      
    }

   
    
    @Override
    public void startCampaign(String APIToken,Long campaignId)throws IOException, URISyntaxException{
         User authUser = userService.getUser(APIToken);
        if(authUser instanceof Master){
            try{
                Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) authUser);
                if(c.getStatus().equals("ready")){
               //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (AVVIA CAMPAGNE CHE ESISTONO)
                List<Task> tasks = taskRepository.getTasksForCampaign(c.getId());
                int annotation = 0;
                int selection = 0;
                if(tasks == null)
                    throw new PreconditionFailedException("Not enough annotation/selection workers assigned");
                for(Task t : tasks){
                    if(t.getType().equals(Task.ANNOTATION))
                        annotation++;
                    if(t.getType().equals(Task.SELECTION))
                        selection++;
                }
                if(!(annotation >= c.getAnnotationReplica() && selection >= c.getSelectionReplica()))
                    throw new PreconditionFailedException("Not enough annotation/selection workers assigned");

               campaignRepository.startCampaign((Master) authUser, c);
               //inizializza i task
               taskService.initializeTasks(APIToken,c);
                }
                else
                    throw new CampaignNotReadyException();
              }catch(NullPointerException e){
                  e.printStackTrace();
                throw new CampaignNotFoundException();
              }catch(CampaignNotReadyException e){
                  e.printStackTrace();
                  throw new CampaignNotReadyException();
              }
        }
        else throw new UserNotMasterException();
    }
    @Override
    public void terminateCampaign(String APIToken,Long campaignId)throws IOException, URISyntaxException{
        User authUser = userService.getUser(APIToken);
        if(authUser instanceof Master){
            try{
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) authUser);
             if(c.getStatus().equals("started"))
             //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (TERMINA CAMPAGNE CHE SONO GIA' INIZIATE!!!)
             campaignRepository.terminateCampaign((Master) authUser, c);
             else
                 throw new CampaignNotStartedException();
            }catch(NullPointerException e){
                throw new PreconditionFailedException();
            }

        }
        else throw new UserNotMasterException();
    }
    
   
  
       @Override
        public ImageStatistics getCampaignImageStatistics(String APIToken, Long campaignId)throws IOException, URISyntaxException{
            User u = userService.getUser(APIToken);
         if(u instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master)u);
             if(c == null)
                 throw new CampaignNotFoundException();
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
                    List<Image> i = imageService.getCampaignImages(APIToken, campaignId);
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
