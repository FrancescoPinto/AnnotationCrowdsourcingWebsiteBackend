/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.convenience.ImageStatisticsDetails;
import java.util.List;

/**
 *
 * @author Utente
 */
public class ImageStatisticsDetailsDTO {
    private Selection selection;
    private List<String> annotation;

    public ImageStatisticsDetailsDTO(Selection selection, List<String> annotation) {
        this.selection = selection;
        this.annotation = annotation;
    }

     public ImageStatisticsDetailsDTO(int numacc, int numrej, List<String> annotation) {
        this.selection = new Selection(numacc,numrej);
        this.annotation = annotation;
    }
     
     public ImageStatisticsDetailsDTO(ImageStatisticsDetails i){
         this(i.getNumacc(), i.getNumacc(),i.getAnnotation());
     }
    
    public Selection getSelection() {
        return selection;
    }

    public void setSelection(Selection selection) {
        this.selection = selection;
    }

    public List<String> getAnnotation() {
        return annotation;
    }

    public void setAnnotation(List<String> annotation) {
        this.annotation = annotation;
    }
    
    
}

class Selection {
    private int accepted,
                rejected;

    public Selection(int accepted, int rejected) {
        this.accepted = accepted;
        this.rejected = rejected;
    }

    public int getAccepted() {
        return accepted;
    }

    public void setAccepted(int accepted) {
        this.accepted = accepted;
    }

    public int getRejected() {
        return rejected;
    }

    public void setRejected(int rejected) {
        this.rejected = rejected;
    }
    
}