/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import awt.server.dto.RegistrationDetailsDTO;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 * @author Utente
 */
@Entity
public class Worker extends User {
  //@OneToMany(targetEntity = Task.class, mappedBy = "worker")
    //private List<Task> tasks;
  
    public Worker(RegistrationDetailsDTO dto){
        super(dto);
       // tasks = null;
    }

   /* public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }*/
 
}