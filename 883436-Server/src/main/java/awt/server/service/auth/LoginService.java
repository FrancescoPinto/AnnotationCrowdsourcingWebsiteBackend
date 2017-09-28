/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service.auth;

import awt.server.dto.LoginDetailsDTO;
import awt.server.model.User;
import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface LoginService {
    public String login(LoginDetailsDTO credentials)throws IOException,URISyntaxException; 
    public void logout(String apitoken)throws IOException,URISyntaxException;   
    public void loginToken(String username);
}
