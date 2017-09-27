/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import awt.server.dto.NewCampaignDTO;

/**
 *
 * @author Utente
 */
public class NewCampaign {
  
    private String name;

    private Integer selection_replica;


    private Integer threshold;

    private Integer annotation_replica;

    private Integer annotation_size;

    public NewCampaign(String name, Integer selectionReplica, Integer threshold, Integer annotationReplica, Integer annotationSize) {
        this.name = name;
        this.selection_replica = selectionReplica;
        this.threshold = threshold;
        this.annotation_replica = annotationReplica;
        this.annotation_size = annotationSize;
    }

    public NewCampaign() {
    }
    
     public NewCampaign(NewCampaignDTO n) {
         this(n.getName(), n.getSelection_replica(),n.getThreshold(),n.getAnnotation_replica(),n.getAnnotation_size());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSelection_replica() {
        return selection_replica;
    }

    public void setSelection_replica(Integer selection_replica) {
        this.selection_replica = selection_replica;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public Integer getAnnotation_replica() {
        return annotation_replica;
    }

    public void setAnnotation_replica(Integer annotation_replica) {
        this.annotation_replica = annotation_replica;
    }

    public Integer getAnnotation_size() {
        return annotation_size;
    }

    public void setAnnotation_size(Integer annotation_size) {
        this.annotation_size = annotation_size;
    }
}
