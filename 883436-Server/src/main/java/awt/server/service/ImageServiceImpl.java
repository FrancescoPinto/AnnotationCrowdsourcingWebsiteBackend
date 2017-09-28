/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.exceptions.CampaignNotClosedException;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatisticsDetails;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.ImageRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import awt.server.respository.WorkerRepository;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Utente
 */
@Service
@Transactional(propagation=Propagation.REQUIRED)
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageRepository imageRepository;
    
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
    UserService userService;
    
    @Override
      public Image store(MultipartFile file, String APIToken, Long campaignId) throws IOException, URISyntaxException{
          
           User u = userService.getUser(APIToken);

          if(u instanceof Master){
          Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) u);
          if(c == null)
              throw new CampaignNotFoundException();
          
            if(!c.getStatus().equals(Campaign.ready))
                throw new CampaignNotReadyException();
          return imageRepository.store(file,(Master) u, c);
          }
          else throw new UserNotMasterException();
      }
    
      @Override
    public Resource loadFile(String filename){
        return imageRepository.loadFile(filename);
    }
    
    @Override
    public void deleteAll(){
        imageRepository.deleteAll();
    }
    @Override
    public void init(){
        imageRepository.init();
    }
    
    
    @Override
    public FileSystemResource getFileSystemResource(Long campaignId, Long imageId){
        FileSystemResource fsr = imageRepository.getFileSystemResource(campaignId,imageId);
            return fsr;
    }
    
    @Override
    public void deleteImage(String APIToken, Long campaignId,Long imageId)throws IOException, URISyntaxException{
                        User u = userService.getUser(APIToken);

          if(u instanceof Master){
              Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) u);
               if(c == null)
              throw new CampaignNotFoundException();
          
            if(!c.getStatus().equals(Campaign.ready))
                throw new CampaignNotReadyException();
          imageRepository.deleteImage(campaignId,imageId, u.getId());
          }
          else throw new UserNotMasterException();
    } 
    
    @Override
    public Image getImageInfo(String APIToken, Long campaignId,Long imageId)throws IOException, URISyntaxException{
                        User u = userService.getUser(APIToken);

        if(u instanceof Master){
          return imageRepository.getImage(campaignId,imageId, u.getId());
          }
          else throw new UserNotMasterException();
    }
    
       @Override
    public List<Image> getCampaignImages(String APIToken, Long campaignId)throws IOException, URISyntaxException{
                        User user = userService.getUser(APIToken);

        if(user instanceof Master){
             List<Image> imgs= imageRepository.getCampaignImages((Master) user,campaignId);
             return imgs;        
        }
        else throw new UserNotMasterException();
    }      
    
       @Override
    public ImageStatisticsDetails getImageStatisticsDetails(String APIToken, Long campaignId, Long imageId)throws IOException, URISyntaxException{
                        User u = userService.getUser(APIToken);

         if(u instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master)u);
             if(c == null)
                 throw new CampaignNotFoundException();
             if(c.getStatus().equals("ended")){
                // List<Task> ts = taskRepository.getTasksForCampaign(campaignId);
                // for(Task t: ts){
                List<SelectionTaskInstance> sti = stiRepository.getSelectionTaskInstancesForImageOfCampaign(imageId);
                List<AnnotationTaskInstance> ati = atiRepository.getAnnotationTaskInstancesForImageOfCampaign(imageId);
                List<String> skylines = new ArrayList<>();
                if(ati == null)
                    ;
                else
                for(AnnotationTaskInstance a : ati){
                    if(!a.getSkyline().equals(AnnotationTaskInstance.NOTALREADY))
                    skylines.add(a.getSkyline());
                }
                
                int numaccept = 0;
                int numrej = 0;
                if(sti == null)
                    ;
                else
                for(SelectionTaskInstance s: sti){
                    if(s.getSelected().equals("accepted"))
                        numaccept++;
                    else if(s.getSelected().equals("rejected"))
                        numrej++;
                }
                
                return new ImageStatisticsDetails(numaccept,numrej,skylines);
                
                    /* DEVI
                             1) prendere tutte le selectionTaskInstance
                                     2) prendere tutte le annotationTaskInstance
                                             accorpare le info in un oggetto ImageStatisticsDetailsDTO
                                                     NOTA: per identificare un immagine tu di soliti usi campagna 
                                                             però non è obbligatorio! infatti gli id immagine sono già
                                                                     di loro univoci*/
                 
             }
             else throw new CampaignNotClosedException();
          
          }
          else throw new UserNotMasterException();
    }
        @Override
        public List<Image> getSelectedImages(Campaign c){

            List<Image> images = c.getImages();
            List<Image> selectedImages = new ArrayList<>();
            for(Image i: images){
                List<SelectionTaskInstance> stis = stiRepository.getSelectionTaskInstancesForImageOfCampaign(i.getId());
                int numSelected = 0;
                for(SelectionTaskInstance sti: stis){
                    if(sti.getSelected().equals(SelectionTaskInstance.ACCEPTED))
                        numSelected++;
                }
                if(numSelected >= c.getThreshold())
                    selectedImages.add(i);
            }
            return selectedImages;
        }
}
