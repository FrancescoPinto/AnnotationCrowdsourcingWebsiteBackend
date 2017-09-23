/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import awt.server.dto.*;
import java.util.List;

/**
 *
 * @author Utente
 */
public class ImageStatisticsDetails {
    private int numacc, numrej;
    private List<String> annotation;

     public ImageStatisticsDetails(int numacc, int numrej, List<String> annotation) {
        this.numacc = numacc;
        this.numrej = numrej;
        this.annotation = annotation;
    }

    public int getNumacc() {
        return numacc;
    }

    public void setNumacc(int numacc) {
        this.numacc = numacc;
    }

    public int getNumrej() {
        return numrej;
    }

    public void setNumrej(int numrej) {
        this.numrej = numrej;
    }
    
  
    public List<String> getAnnotation() {
        return annotation;
    }

    public void setAnnotation(List<String> annotation) {
        this.annotation = annotation;
    }
    
    
}
