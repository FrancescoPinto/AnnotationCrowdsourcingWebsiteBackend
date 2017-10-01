package awt.server.respository;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import awt.server.exceptions.ProfileNotFoundException;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import static org.apache.tomcat.jni.User.username;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Repository

@Transactional
public class UserRepositoryImpl implements UserRepository{
    @PersistenceContext
    private EntityManager em;
    
    @Override
    public void registerUser(User user){
        if(user instanceof Master)
            em.persist((Master) user);
        else if(user instanceof Worker)
            em.persist((Worker) user);
        
    }
    
    @Override
    public User findByUsername(String username){
        Query q1 = em.createNamedQuery("findMasterByUsername");
        q1.setParameter(1,username);
        List<User> result1 = q1.getResultList();
        if(result1.isEmpty()){
            Query q2 = em.createNamedQuery("findWorkerByUsername");
            q2.setParameter(1,username);
            List<User> result2 = q2.getResultList();
            if(result2.isEmpty())
                return null;
            else
                return result2.get(0);
        }
        else
            return result1.get(0);
    }
    @Override
    public void editUserInfo(User user, String fullname, String password) throws ProfileNotFoundException{
        User temp;
        if(user instanceof Master){
            temp = em.find(Master.class,user.getId());
        }else if(user instanceof Worker){
            temp = em.find(Worker.class,user.getId());
        }else{
            throw new ProfileNotFoundException(user.getUsername());
        }
        
        temp.setFullname(fullname);
        temp.setPassword(password);
    }
    

    
}
