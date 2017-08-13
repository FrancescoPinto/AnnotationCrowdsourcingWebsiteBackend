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
public class WorkersDTO {
    private List<WorkerDTO> workers;

    public WorkersDTO() {
    }

    public WorkersDTO(List<WorkerDTO> workers) {
        this.workers = workers;
    }

    public List<WorkerDTO> getWorkers() {
        return workers;
    }

    public void setWorkers(List<WorkerDTO> workers) {
        this.workers = workers;
    }
    
}
