/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.WorkerDTO;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Campaign;
import awt.server.model.Master;
import awt.server.model.Task;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.AnnotationTaskInstanceRepository;
import awt.server.respository.CampaignRepository;
import awt.server.respository.ImageRepository;
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
public class WorkerServiceImpl implements WorkerService{
    
           @Autowired
    TaskRepository taskRepository;

    @Autowired
    CampaignRepository campaignRepository;
   
    
    @Autowired
    WorkerRepository workerRepository;
    
     @Override
        public List<awt.server.model.convenience.Worker> getWorkersForCampaign(User user, Long campaignId){
        if(user instanceof Master){
            List<Worker> workers = workerRepository.getWorkers();
            List<awt.server.model.convenience.Worker> workerResult = new ArrayList<>();
            
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


                        workerResult.add(new awt.server.model.convenience.Worker(w.getId(), campaignId,w.getFullname(),workerIsSelector,workerIsAnnotator));
                    }
                   return workerResult;
                }
            else return null;
        }
        else throw new UserNotMasterException();
        
    }

    @Override
        public awt.server.model.convenience.Worker getWorkerInfo(User user, Long workerId, Long campaignId){
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

            return new awt.server.model.convenience.Worker(worker.getId(), campaignId, worker.getFullname(),workerIsSelector,workerIsAnnotator);
          
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
    
  
}
