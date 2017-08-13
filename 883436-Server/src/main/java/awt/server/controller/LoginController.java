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
import awt.server.dto.LoginDetailsDTO;
import awt.server.dto.TokenDTO;
import awt.server.exceptions.FailedToLoginException;
import awt.server.model.User;
import awt.server.service.JwtService;
import awt.server.service.LoginService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class LoginController {

    private final LoginService loginService;
    private final JwtService jwtService;
    private List<String> tempTokens;

    @SuppressWarnings("unused")
    public LoginController() {
        this(null, null);
    }

    @Autowired
    public LoginController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

   @RequestMapping(path = "/api/auth",
           method = RequestMethod.POST,
           consumes = "application/json",
            produces = APPLICATION_JSON_VALUE)
    public ResponseEntity login(@RequestBody LoginDetailsDTO credentials,
                                HttpServletResponse response) {
        User temp = loginService.login(credentials);
        if (temp == null)
            throw new FailedToLoginException(credentials.getUsername());
        else
            try{
                String token = jwtService.tokenFor(temp);
                    response.setHeader("Authorization", token);
                    return  ResponseEntity.ok().body(new TokenDTO(token));
                }catch(Exception e){
                        throw new RuntimeException(e);
               }
               
    }
    
    @RequestMapping(path = "/api/auth",
           method = RequestMethod.DELETE)
    public void logout(@RequestHeader("Authorization") String APIToken) {
     //HOW LOGIN?                
    }
}
