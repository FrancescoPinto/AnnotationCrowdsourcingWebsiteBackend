/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import com.fasterxml.jackson.annotation.JsonRootName;

/**
 *
 * @author Utente
 */
@JsonRootName(value = "error")
public class ErrorNewCampaignDTO {

    private String name;

    private String selection_replica;
  
    private String threshold;
  
    private String annotation_replica;

    private String annotation_size;

    public ErrorNewCampaignDTO(String name, String selection_replica, String threshold, String annotation_replica, String annotation_size) {
        this.name = name;
        this.selection_replica = selection_replica;
        this.threshold = threshold;
        this.annotation_replica = annotation_replica;
        this.annotation_size = annotation_size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSelection_replica() {
        return selection_replica;
    }

    public void setSelection_replica(String selection_replica) {
        this.selection_replica = selection_replica;
    }

    public String getThreshold() {
        return threshold;
    }

    public void setThreshold(String threshold) {
        this.threshold = threshold;
    }

    public String getAnnotation_replica() {
        return annotation_replica;
    }

    public void setAnnotation_replica(String annotation_replica) {
        this.annotation_replica = annotation_replica;
    }

    public String getAnnotation_size() {
        return annotation_size;
    }

    public void setAnnotation_size(String annotation_size) {
        this.annotation_size = annotation_size;
    }

  
    
}
