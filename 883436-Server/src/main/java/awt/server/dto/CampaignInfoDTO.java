/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Campaign;

/**
 *
 * @author Utente
 */
public class CampaignInfoDTO {
    private String id,
                   name,
                   status;
    private int selection_replica,
                threshold,
                annotation_replica,
                annotation_size;
    private String image,
                   worker,
                   execution,
                   statistics;

    public CampaignInfoDTO(String id, String name, String status, int selectionReplica, int threshold, int annotationReplica, int annotationSize, String image, String worker, String execution, String statistics) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.selection_replica = selectionReplica;
        this.threshold = threshold;
        this.annotation_replica = annotationReplica;
        this.annotation_size = annotationSize;
        this.image = image;
        this.worker = worker;
        this.execution = execution;
        this.statistics = statistics;
    }

    public CampaignInfoDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getSelection_replica() {
        return selection_replica;
    }

    public void setSelection_replica(int selection_replica) {
        this.selection_replica = selection_replica;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public int getAnnotation_replica() {
        return annotation_replica;
    }

    public void setAnnotation_replica(int annotation_replica) {
        this.annotation_replica = annotation_replica;
    }

    public int getAnnotation_size() {
        return annotation_size;
    }

    public void setAnnotation_size(int annotation_size) {
        this.annotation_size = annotation_size;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getWorker() {
        return worker;
    }

    public void setWorker(String worker) {
        this.worker = worker;
    }

    public String getExecution() {
        return execution;
    }

    public void setExecution(String execution) {
        this.execution = execution;
    }

    public String getStatistics() {
        return statistics;
    }

    public void setStatistics(String statistics) {
        this.statistics = statistics;
    }
    
    public static CampaignInfoDTO fromCampaignToCampaignInfoDTO(Campaign c){
        return new CampaignInfoDTO(
                "/api/campaign/"+c.getId(),
                c.getName(),
                c.getStatus(),
                c.getSelectionReplica(),
                c.getThreshold(),
                c.getAnnotationReplica(),
                c.getAnnotationSize(),
                "/api/campaign/"+c.getId()+"/image",
                "/api/campaign/"+c.getId()+"/worker",
                "/api/campaign/"+c.getId()+"/execution",
                "/api/campaign/"+c.getId()+"/statistics"
                );
    }
    
}
