/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import awt.server.model.convenience.TaskSimplified;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Utente
 */
public class TasksDTO {
    private List<TaskDTO> tasks;

    public TasksDTO() {
    }

    public TasksDTO(List<TaskSimplified> tasks) {
        List<TaskDTO> temp = new ArrayList<>();
        for(TaskSimplified ts:tasks){
            temp.add(new TaskDTO(ts)); 
        }
        this.tasks = temp;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }
    
}
