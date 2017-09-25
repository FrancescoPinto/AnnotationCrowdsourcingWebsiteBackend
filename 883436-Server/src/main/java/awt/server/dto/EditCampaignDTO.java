/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author Utente
 */

//ATTENTO: INVIERAI UNA List<CampaignDTO> automaticamente convertita in array
public class EditCampaignDTO {
   @NotEmpty
   @Length(min = 1, max = 30)
    private String name;
    @NotNull
    @Min(1) 
    private Integer selection_replica;
    @NotNull
    @Min(1)
    private Integer threshold;
    @NotNull
    @Min(1)
    private Integer annotation_replica;
    @NotNull
    @Min(1) @Max(10)
    private Integer annotation_size;

    public EditCampaignDTO(String name, int selectionReplica, int threshold, int annotationReplica, int annotationSize) {
        this.name = name;
        this.selection_replica = selectionReplica;
        this.threshold = threshold;
        this.annotation_replica = annotationReplica;
        this.annotation_size = annotationSize;
    }

    public EditCampaignDTO() {
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
