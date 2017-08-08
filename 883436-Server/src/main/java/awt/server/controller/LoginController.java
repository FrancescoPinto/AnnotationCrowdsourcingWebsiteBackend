/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

/**
 *
 * @author Utente
 */
import awt.server.auth.LoginCredentials;
import awt.server.exceptions.FailedToLoginException;
import awt.server.model.User;
import awt.server.service.JwtService;
import awt.server.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(path = "/login")
public class LoginController {

    private final LoginService loginService;
    private final JwtService jwtService;

    @SuppressWarnings("unused")
    public LoginController() {
        this(null, null);
    }

    @Autowired
    public LoginController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

    @RequestMapping(path = "",
            method = POST,
            produces = APPLICATION_JSON_VALUE)
    public User login(@RequestBody LoginCredentials credentials,
                                HttpServletResponse response) {
        User temp = loginService.login(credentials) ;
        if (temp == null)
            throw new FailedToLoginException(credentials.getUsername());
        else
            try{
                    response.setHeader("Authorization", jwtService.tokenFor(temp));
                    return temp;
                }catch(Exception e){
                        throw new RuntimeException(e);
               }
                
    }
}
