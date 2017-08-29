/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.exceptions.ProfileNotFoundException;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;

import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */

@Transactional
public interface UserRepository {
    public User findByUsername(String username);
    public void registerUser(User user);
    public void editUserInfo(User user, String fullname, String password) throws ProfileNotFoundException;
    
}
