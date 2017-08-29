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
public class TasksDTO {
    private List<TaskDTO> tasks;

    public TasksDTO() {
    }

    public TasksDTO(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }
    
}
