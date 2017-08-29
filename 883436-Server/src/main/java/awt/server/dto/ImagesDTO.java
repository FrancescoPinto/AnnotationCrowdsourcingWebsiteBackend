/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import java.util.List;

/**
 *
 * @author Utente
 */
public class ImagesDTO {
    List<ImageDTO> images;

    public ImagesDTO() {
    }

    public ImagesDTO(List<ImageDTO> images) {
        this.images = images;
    }

    public List<ImageDTO> getImages() {
        return images;
    }

    public void setImages(List<ImageDTO> images) {
        this.images = images;
    }
    
}
