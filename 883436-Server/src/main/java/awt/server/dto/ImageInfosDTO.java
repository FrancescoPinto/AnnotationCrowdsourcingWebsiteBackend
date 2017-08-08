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
public class ImageInfosDTO {
    private String id,
                   canonical,
                   statistics;

    public ImageInfosDTO(String id, String canonical, String statistics) {
        this.id = id;
        this.canonical = canonical;
        this.statistics = statistics;
    }

    public String getStatistics() {
        return statistics;
    }

    public void setStatistics(String statistics) {
        this.statistics = statistics;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCanonical() {
        return canonical;
    }

    public void setCanonical(String canonical) {
        this.canonical = canonical;
    }
    
}
