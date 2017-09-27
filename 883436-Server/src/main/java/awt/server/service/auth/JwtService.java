/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service.auth;

import awt.server.model.User;
import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public interface JwtService {
 
    public String tokenFor(User user) throws IOException, URISyntaxException;

    public User verify(String token) throws IOException, URISyntaxException;
    
    public void logoutToken(String token, String username);
      
}
