/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.User;
import awt.server.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Component
@Transactional
public class UserServiceImpl implements UserService{
     @Autowired
    private UserRepository userRepository;
    
    public void registerUser(User user){ 
        userRepository.registerUser(user);
    }
}
