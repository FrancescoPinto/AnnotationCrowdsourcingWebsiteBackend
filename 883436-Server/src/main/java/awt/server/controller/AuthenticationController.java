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
import awt.server.dto.ErrorDTO;
import awt.server.dto.ErrorMapDTO;
import awt.server.dto.LoginDetailsDTO;
import awt.server.dto.TokenDTO;
import awt.server.exceptions.FailedToLoginException;
import awt.server.model.User;
import awt.server.service.UserService;
import awt.server.service.auth.JwtService;
import awt.server.service.auth.LoginService;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.hibernate.validator.internal.engine.path.PathImpl;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class AuthenticationController {

    @Autowired
    private LoginService loginService;
    @Autowired
    private JwtService jwtService; 
    
   @Autowired
    private Validator validator;
    

   @RequestMapping(path = "/api/auth",
           method = RequestMethod.POST,
           consumes = "application/json",
            produces = APPLICATION_JSON_VALUE)
    public ResponseEntity login(@RequestBody LoginDetailsDTO credentials,
                                HttpServletResponse response) {
        
        
        Set<ConstraintViolation<LoginDetailsDTO>> constraintViolations = validator.validate( credentials );
        if(constraintViolations.isEmpty()){

                try{
                        String token = loginService.login(credentials);
                        if (token == null)
                            throw new FailedToLoginException("Wrong username and/or password");

                        response.setHeader("Authorization", token);
                        return  ResponseEntity.ok().body(new TokenDTO(token));
               // }catch (FailedToLoginException e){
                 //   throw new RuntimeException(e);
                }catch(Exception e){
                    return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
                        //return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage())); 
               }
        }else{

           ErrorMapDTO temp = new ErrorMapDTO();
            for(ConstraintViolation<LoginDetailsDTO> cv: constraintViolations){
                temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
            }
            return ResponseEntity.badRequest().body(temp);
        }
               
    }
    
    @RequestMapping(path = "/api/auth",
           method = RequestMethod.DELETE)
    public ResponseEntity logout(@RequestHeader("Authorization") String APIToken) {
            try{
                    
                    loginService.logout(APIToken);
                    return  ResponseEntity.ok().body(null);
                 }catch(Exception e){
                        throw new RuntimeException(e);
               }
    }
}
