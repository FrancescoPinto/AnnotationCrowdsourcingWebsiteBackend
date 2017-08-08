package awt.server.respository;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Utente
 */
@Repository
public class UserRepositoryImpl implements UserRepository{
    @PersistenceContext
    private EntityManager em;
    
    public void registerUser(User user){
        if(user instanceof Master)
            em.persist((Master) user);
        else if(user instanceof Worker)
            em.persist((Worker) user);
        
    }
    
    public User findByUsername(String username){
        Query q = em.createQuery("SELECT m FROM Master m where m.username = ?1");
        q.setParameter(1,username);
        List<User> result = q.getResultList();
        if(result.isEmpty())
            return null;
        else
            return result.get(0);
    }
    
}
