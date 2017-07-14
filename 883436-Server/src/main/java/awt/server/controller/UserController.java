/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.model.NewUserForm;
import awt.server.model.UserInfoResponse;
import awt.server.other.ServerResult;
import awt.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author Utente
 */

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createUser(@RequestBody NewUserForm newUser) {
        ServerResult result = userService.createUser(newUser);
        switch(result){
            case NEW_USER_SUCCESS: 
                return ResponseEntity.ok(result);
            case NEW_USER_FAIL:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            default:
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @RequestMapping(value = "/me",method = RequestMethod.GET)
    public ResponseEntity getUserInfo(@RequestHeader(value = "Authorization") String apiToken){
        UserInfoResponse userInfo = userService.getUserInfo(apiToken);
        if(userInfo == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else{
            return ResponseEntity.ok(userInfo);
        }
    }
}
