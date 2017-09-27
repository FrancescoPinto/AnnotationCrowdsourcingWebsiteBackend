/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import org.springframework.stereotype.Repository;

/**
 *
 * @author Utente
 */
@Repository
public interface InvalidTokenRepository {
    public void loginToken(String username);
    public boolean isTokenInvalid(String token);
    public void logoutToken(String token,String username);
}
