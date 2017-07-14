/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.NewUserForm;
import awt.server.model.UserInfoResponse;
import awt.server.other.ServerResult;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service
public class UserServiceImpl implements UserService {
    @Override 
    public  ServerResult createUser(NewUserForm newUser){
        return ServerResult.NEW_USER_SUCCESS;
    }
    
    @Override
    public UserInfoResponse getUserInfo(String apiToken){
        return new UserInfoResponse("Dada","dada","password");
    }
}
