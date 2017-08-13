/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.WorkerDTO;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.AnnotationTask;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.SelectionTask;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.CampaignRepository;
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
        if(user instanceof Master)
            campaignRepository.editCampaign((Master) user,campaignId,name, selectRepl, thr, annRepl, annSize);
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


                        workerResult.add(new WorkerDTO(w.getId(),w.getFullname(),workerIsSelector,workerIsAnnotator));
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

            return new WorkerDTO(worker.getId(),worker.getFullname(),workerIsSelector,workerIsAnnotator);
          
        }
        else throw new UserNotMasterException();
        
    }
        
        
    @Override
    public void enableWorkerForSelectionForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
           
            taskRepository.createSelectionTaskForWorkerForCampaign(workerId,user.getId(),campaignId);

        }
        else throw new UserNotMasterException();
        
    }
    @Override
    public void disableWorkerForSelectionForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
           
            taskRepository.deleteSelectionTaskForWorkerForCampaign(workerId,user.getId(),campaignId);

        }
        else throw new UserNotMasterException();
        
    } 
    @Override
    public void enableWorkerForAnnotationForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
           
            taskRepository.createAnnotationTaskForWorkerForCampaign(workerId,user.getId(),campaignId);

        }
        else throw new UserNotMasterException();
        
    }
    @Override
    public void disableWorkerForAnnotationForCampaign(User user,Long workerId,Long campaignId){
         if(user instanceof Master){
           
            taskRepository.deleteAnnotationTaskForWorkerForCampaign(workerId,user.getId(),campaignId);

        }
        else throw new UserNotMasterException();
        
    }
}
