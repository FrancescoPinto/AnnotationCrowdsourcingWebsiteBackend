/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Task;

/**
 *
 * @author Utente
 */
//MANDI UNA List!!!
public class TaskDTO {
    private Long id;
    private String type;

    public TaskDTO(Long id, String type) {
        this.id = id;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public static TaskDTO fromTaskToTaskDTO(Task t){
        return new TaskDTO(t.getId(),t.getType());
      
    }

    public TaskDTO() {
    }
    
}
