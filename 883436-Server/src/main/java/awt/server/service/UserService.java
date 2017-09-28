/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.exceptions.UserNotLogged;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.UserRepository;
import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface UserService {
   public void registerUser(User user);
   public void editUserDetails(String APIToken, String fullname, String password)throws IOException,URISyntaxException;
   public User findByUsername(String username);
    public User getUser(String APIToken) throws UserNotLogged,IOException,URISyntaxException;
}
