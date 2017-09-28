/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.convenience.InvalidToken;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Repository

@Transactional
public class InvalidTokenRepositoryImpl implements InvalidTokenRepository {
    @PersistenceContext
    private EntityManager em;
    
    @Override
    public void loginToken(String username){
      
         
            Query q = em.createQuery("select it from InvalidToken it where it.username = ?1");
        q.setParameter(1,username);
        List<InvalidToken> itl = q.getResultList();
            if(!itl.isEmpty())
                em.remove(itl.get(0));

    }
    @Override
    public boolean isTokenInvalid(String token){
        
        Query q = em.createQuery("select it from InvalidToken it where it.invalidToken = ?1");
        q.setParameter(1,token);
        List<InvalidToken> itl = q.getResultList();
       if(itl.isEmpty())
            return false;
        else 
            return true;
    }
    @Override
    public void logoutToken(String token,String username){
        InvalidToken it = em.find(InvalidToken.class,username);
        if(it == null){
            InvalidToken temp = new InvalidToken(token,username);
            em.persist(temp);
        }
    }
}
