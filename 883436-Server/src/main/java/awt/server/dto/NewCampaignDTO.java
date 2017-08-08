/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

/**
 *
 * @author Utente
 */
public class NewCampaignDTO {
    private String name;
    private int selection_replica,
                threshold,
                annotation_replica,
                annotation_size;

    public NewCampaignDTO(String name, int selection_replica, int threshold, int annotation_replica, int annotation_size) {
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
    
}
