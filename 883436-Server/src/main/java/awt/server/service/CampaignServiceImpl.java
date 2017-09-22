/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.ImageStatisticsDTO;
import awt.server.dto.ImageStatisticsDetailsDTO;
import awt.server.dto.WorkerDTO;
import awt.server.exceptions.CampaignNotClosedException;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.CampaignNotStartedException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.AnnotationTaskInstance;
import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import awt.server.model.SelectionTaskInstance;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.SelectionTaskInstanceRepository;
import awt.server.respository.TaskRepository;
import awt.server.respository.WorkerRepository;
import java.util.ArrayList;
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
    
    
    @Override
    public List<Campaign> getMasterCampaigns(User user) throws UserNotMasterException{
        if(user instanceof Master)
            return campaignRepository.getMasterCampaigns((Master) user);
        else throw new UserNotMasterException();
                 
    }
    
    @Override
    public Campaign createCampaign(Campaign campaign){
        //if(user instanceof Master)
            return campaignRepository.createCampaign(campaign);
        // else throw new UserNotMasterException();
    }
    
    @Override
    public Campaign getCampaignDetails(Long campaignId,User user){
         if(user instanceof Master)
            return campaignRepository.getCampaignDetails(campaignId,(Master) user);
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
        public List<WorkerDTO> getWorkersForCampaign(User user, Long campaignId){
        if(user instanceof Master){
            List<Worker> workers = workerRepository.getWorkers();
            List<WorkerDTO> workerResult = new ArrayList<>();
            
            if(workers != null){
                for(Worker w : workers){
                        boolean workerIsSelector = false;
                        boolean workerIsAnnotator = false;
                        Task tempAnnotation = taskRepository.getWorkerAnnotationTaskForCampaign(w.getId(), user.getId(),campaignId);
                        Task tempSelection = taskRepository.getWorkerSelectionTaskForCampaign(w.getId(), user.getId(),campaignId);

                        if(tempAnnotation != null)
                            workerIsAnnotator = true;
                        if(tempSelection != null)
                            workerIsSelector = true;


                        workerResult.add(new WorkerDTO(w.getId(), campaignId,w.getFullname(),workerIsSelector,workerIsAnnotator));
                    }
                   return workerResult;
                }
            else return null;
        }
        else throw new UserNotMasterException();
        
    }

    @Override
        public WorkerDTO getWorkerInfo(User user, Long workerId, Long campaignId){
        if(user instanceof Master){
            Worker worker = workerRepository.getWorkerInfo(workerId);
            Task tempAnnotation = taskRepository.getWorkerAnnotationTaskForCampaign(worker.getId(),user.getId(),campaignId);
            Task tempSelection = taskRepository.getWorkerSelectionTaskForCampaign(worker.getId(),user.getId(),campaignId);

            boolean workerIsSelector = false;
            boolean workerIsAnnotator = false;

            if(tempAnnotation != null)
                workerIsAnnotator = true;
            if(tempSelection != null)
                workerIsSelector = true;

            return new WorkerDTO(worker.getId(), campaignId, worker.getFullname(),workerIsSelector,workerIsAnnotator);
          
        }
        else throw new UserNotMasterException();
        
    }
        
        
    @Override
    public void enableWorkerForSelectionForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
             
             //TODO: IMPEDIRE LA CHIAMATA DI QUESTI METODI SU CAMPAGNE GIA' AVVIATE O TERMINATE
             //DOMANDA: LA LOGICA PER CUI NON CI DEVONO ESSERE DUPLICATI NON DOVREBBE ESSERE GESTITA QUI INVECE CHE NEL REPOSITORY???
             //FORSE NO, DATO CHE ALLA FINE E' ANCHE QUALCOSA DI INTEGRITA' DEI DATI ... FORSE
             
            Worker w = workerRepository.getWorkerById(workerId);
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
           
            taskRepository.createSelectionTaskForWorkerForCampaign((Master) user, w,c);

        }
        else throw new UserNotMasterException();
        
    }
    @Override
    public void disableWorkerForSelectionForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
           
               //TODO: IMPEDIRE LA CHIAMATA DI QUESTI METODI SU CAMPAGNE GIA' AVVIATE
               
            Worker w = workerRepository.getWorkerById(workerId);
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
            taskRepository.deleteSelectionTaskForWorkerForCampaign((Master) user, w,c);

        }
        else throw new UserNotMasterException();
        
    } 
    @Override
    public void enableWorkerForAnnotationForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
            Worker w = workerRepository.getWorkerById(workerId);
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
               //TODO: IMPEDIRE LA CHIAMATA DI QUESTI METODI SU CAMPAGNE GIA' AVVIATE
            taskRepository.createAnnotationTaskForWorkerForCampaign((Master) user, w,c);

        }
        else throw new UserNotMasterException();
        
    }
    @Override
    public void disableWorkerForAnnotationForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
              Worker w = workerRepository.getWorkerById(workerId);
            Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
             //TODO: IMPEDIRE LA CHIAMATA DI QUESTI METODI SU CAMPAGNE GIA' AVVIATE
            taskRepository.deleteAnnotationTaskForWorkerForCampaign((Master) user, w,c);

        }
        else throw new UserNotMasterException();
        
    }
    
    @Override
    public void startCampaign(User user,Long campaignId){
        if(user instanceof Master){
              Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
              if(c.getStatus().equals("ready")){
             //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (AVVIA CAMPAGNE CHE ESISTONO)
             campaignRepository.startCampaign((Master) user, c);
             //inizializza i task
             taskService.initializeTasks(user,c);
              }
              else
                  throw new CampaignNotReadyException();

        }
        else throw new UserNotMasterException();
    }
    @Override
    public void terminateCampaign(User user,Long campaignId){
        if(user instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master) user);
             if(c.getStatus().equals("started"))
             //TODO: ASSICURARE LA LOGICA DI BUSINESS CORRETTA  (TERMINA CAMPAGNE CHE SONO GIA' INIZIATE!!!)
             campaignRepository.terminateCampaign((Master) user, c);
             else
                 throw new CampaignNotStartedException();

        }
        else throw new UserNotMasterException();
    }
    
    @Override
    public List<Image> getCampaignImages(User user, Long campaignId){
        if(user instanceof Master){
             List<Image> imgs= campaignRepository.getCampaignImages((Master) user,campaignId);
             return imgs;        
        }
        else throw new UserNotMasterException();
    }      
    
       @Override
    public ImageStatisticsDetailsDTO getImageStatisticsDetails(User u, Long campaignId, Long imageId){
         if(u instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master)u);
             if(c.getStatus().equals("ended")){
                // List<Task> ts = taskRepository.getTasksForCampaign(campaignId);
                // for(Task t: ts){
                List<SelectionTaskInstance> sti = stiRepository.getSelectionTaskInstancesForImageOfCampaign(imageId);
                List<AnnotationTaskInstance> ati = atiRepository.getAnnotationTaskInstancesForImageOfCampaign(imageId);
                List<String> skylines = new ArrayList<>();
                for(AnnotationTaskInstance a : ati){
                    if(!a.getSkyline().equals(AnnotationTaskInstance.NOTALREADY))
                    skylines.add(a.getSkyline());
                }
                
                int numaccept = 0;
                int numrej = 0;
                for(SelectionTaskInstance s: sti){
                    if(s.getSelected().equals("accepted"))
                        numaccept++;
                    else if(s.getSelected().equals("rejected"))
                        numrej++;
                }
                
                return new ImageStatisticsDetailsDTO(numaccept,numrej,skylines);
                
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
        public ImageStatisticsDTO getCampaignImageStatistics(User u, Long campaignId){
         if(u instanceof Master){
             Campaign c = campaignRepository.getCampaignDetails(campaignId, (Master)u);
             if(c.getStatus().equals("ended")){
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
                List<Image> selectedImages = getSelectedImages(c);
                
                /*for(SelectionTaskInstance s: sti){
                    if(s.getSelected().equals("accepted"))
                        numaccept++;
                    else if(s.getSelected().equals("rejected"))
                        numrej++;
                }*/
                
                int numImg = 0;
                List<Image> i = campaignRepository.getCampaignImages((Master)u, campaignId);
                if(i != null)
                    numImg = i.size();
                
                if(selectedImages.isEmpty()){
                    numrej = numImg;
                }else
                {
                    numaccept = selectedImages.size();
                    numrej = numImg - numaccept;
                }
                
                return new ImageStatisticsDTO(numImg,numaccept,numrej,numannot);
                
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
