/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.Task;
import awt.server.model.convenience.TaskSimplified;

/**
 *
 * @author Utente
 */
//MANDI UNA List!!!
public class TaskDTO {
    private String id;
    private String type;

    public TaskDTO(String id, String type) {
        this.id = id;
        this.type = type;
    }
    
    public TaskDTO(TaskSimplified t){
        this.id = "/api/task/"+t.getId(); 
        this.type = t.getType();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public static TaskDTO fromTaskToTaskDTO(Task t){
        return new TaskDTO("/api/task/"+t.getId(),t.getType());
      
    }

    public TaskDTO() {
    }
    
}
