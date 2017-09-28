/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import awt.server.model.User;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */


public interface ProfileService {
     public User get(String username);
}
