/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.convenience.ImageStatistics;

/**
 *
 * @author Utente
 */
public class ImageStatisticsDTO {
    private int images,
                accepted,
                rejected,
                annotation;

    public ImageStatisticsDTO(int images, int accepted, int rejected, int annotation) {
        this.images = images;
        this.accepted = accepted;
        this.rejected = rejected;
        this.annotation = annotation;
    }
    
    public ImageStatisticsDTO(ImageStatistics i){
        this.images = i.getImages();
        this.accepted = i.getAccepted();
        this.rejected = i.getRejected();
        this.annotation = i.getAnnotation();
    }

    public int getImages() {
        return images;
    }

    public void setImages(int images) {
        this.images = images;
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

    public int getAnnotation() {
        return annotation;
    }

    public void setAnnotation(int annotation) {
        this.annotation = annotation;
    }
    
}
