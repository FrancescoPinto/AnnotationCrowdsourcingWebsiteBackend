/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.service.auth.JwtService;
import awt.server.exceptions.UserCreationException;
import awt.server.exceptions.UserNotLogged;
import awt.server.model.User;
import awt.server.respository.UserRepository;
import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service
@Transactional(propagation=Propagation.REQUIRED)
public class UserServiceImpl implements UserService{
     @Autowired
    private UserRepository userRepository;
     
            
    @Autowired
    private JwtService jwt;
    
     @Override
    public void registerUser(User user){ 
         User temp = userRepository.findByUsername(user.getUsername());
        if(temp == null){
        userRepository.registerUser(user);
        }else throw new UserCreationException();
    }
    
    @Override
    public void editUserDetails(String APIToken,String fullname, String password) throws IOException,URISyntaxException{
       User user = getUser(APIToken);
        userRepository.editUserInfo(user,fullname,password);
    }
    
    @Override
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }
    
    @Override
     public User getUser(String APIToken) throws UserNotLogged,IOException,URISyntaxException {
        
        String tempAPIToken = APIToken.replace("APIToken ", "");
     
        User temp = jwt.verify(tempAPIToken);
     
        if(temp == null){
            throw new UserNotLogged();
        }
        return temp;
    }
}
