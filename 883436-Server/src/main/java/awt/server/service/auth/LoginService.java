/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service.auth;

import awt.server.dto.LoginDetailsDTO;
import awt.server.model.User;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface LoginService {
    public User login(LoginDetailsDTO credentials); 
    public void logout(User u, String apitoken);   
    public void loginToken(String username);
}
