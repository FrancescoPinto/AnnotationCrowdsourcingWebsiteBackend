/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.auth;

import java.io.IOException;
import java.net.URISyntaxException;

/**
 *
 * @author Utente
 */
public interface SecretKeyProvider {
        public byte[] getKey() throws URISyntaxException, IOException; 

}
