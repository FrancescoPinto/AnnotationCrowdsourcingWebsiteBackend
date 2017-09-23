/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model.convenience;

import awt.server.model.Task;


/**
 *
 * @author Utente
 */
//MANDI UNA List!!!
public class TaskSimplified {
    private String id;
    private String type;

    public TaskSimplified(String id, String type) {
        this.id = id;
        this.type = type;
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
    
    public static TaskSimplified fromTaskToTaskSimplified(Task t){
        return new TaskSimplified(""+t.getId(),t.getType());
      
    }

    public TaskSimplified() {
    }
    
}
