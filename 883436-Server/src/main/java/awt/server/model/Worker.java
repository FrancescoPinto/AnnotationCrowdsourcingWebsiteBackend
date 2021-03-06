/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import awt.server.dto.RegistrationDetailsDTO;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

/**
 * @author Utente
 */
@Entity
@NamedQueries({
    @NamedQuery(
             name = "findWorkerByUsername",
             query = "SELECT w FROM Worker w where w.username = ?1"
     ),
     @NamedQuery(
             name = "getWorkers",
             query = "Select w from Worker w"
     ) 
})

public class Worker extends User {
  //@OneToMany(targetEntity = Task.class, mappedBy = "worker")
    //private List<Task> tasks;
  
    public Worker(RegistrationDetailsDTO dto){
        super(dto);
       // tasks = null;
    }

    public Worker(){
        super();
    }
   /* public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }*/

 
}