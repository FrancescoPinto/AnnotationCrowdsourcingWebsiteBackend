/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;

import awt.server.dto.EditUserDetailsDTO;
import awt.server.dto.ErrorDTO;
import awt.server.dto.ErrorMapDTO;
import awt.server.dto.RegistrationDetailsDTO;
import awt.server.dto.UserDetailsDTO;
import awt.server.exceptions.ProfileNotFoundException;
import awt.server.exceptions.UserCreationException;
import awt.server.exceptions.UserNotFound;
import awt.server.exceptions.UserTypeNotValidException;
import awt.server.model.Master;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.service.UserService;
import awt.server.service.auth.JwtService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.beans.factory.annotation.Autowired;
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

public class UserController {
    /*ATTENTO ATTENTO ATTENTO SE APRI IL DOCUMENTO EXPLANAITION DI JWT-DEMO (che dovrai 
    ricopiare in questo progetto per intero ... con opportune modifiche) capisci 
    come funziona il giochino MA SOPRATTUTTO CAPISCI CHE DEVI MODIFICARE I PATH CHE AVEVI
    PROGETTATO CON ALTRI PATH (ovvero ad user nei path postponi l'username'-> così rendi facile
    recuprare le info dal database (della sicurezza poi se ne occupa l apitoken e i filtri da soli
    il tuo problema era capire chi era l utente, ma così ce lo hai nel link e usi una pathvariable
    facile facile, e della sicurezza te ne sei già occupato (altrimenti il filtro ti avrebbe bloccato
    l'accesso al metodo')))*/
    @Autowired
    private UserService userService;
        
    @Autowired
    private Validator validator;
    
    @RequestMapping(value = "/api/user", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity registerUser(@RequestBody RegistrationDetailsDTO user){
        
        //try{
          
        Set<ConstraintViolation<RegistrationDetailsDTO>> constraintViolations = validator.validate( user );
        if(constraintViolations.isEmpty()){
        //}catch(ProfileNotFoundException e){
           try{ 
                if(user.getType().equals("master")){
                    Master tempUser = new Master(user);
                     userService.registerUser(tempUser);
                }else if(user.getType().equals("worker")){
                    Worker tempUser = new Worker(user);
                     userService.registerUser(tempUser);
                }else throw new UserTypeNotValidException();

                return ResponseEntity.ok().body(null);
            }catch(UserCreationException e){
                   return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));

            }
           catch (Exception e){
                return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
            }
             }else{
           ErrorMapDTO temp = new ErrorMapDTO();
           for(ConstraintViolation<RegistrationDetailsDTO> cv: constraintViolations){
              temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
              
           }
          return ResponseEntity.badRequest().body(temp);
       }
         //  }catch(Exception e1){
         //      throw new RuntimeException(e1);
          // }
       // }
             
            
        //}catch(UserCreationException e){
         //   return ResponseEntity.badRequest().body(new ErrorDTO(e.toString()));
        //}   
    }
    
     @RequestMapping(value = "/api/user/me", 
             method = RequestMethod.GET)
    public ResponseEntity getUserGenericInfo(@RequestHeader("Authorization") String APIToken){
        try{     
                User authUser = userService.getUser(APIToken); 
                return ResponseEntity.ok().body(new UserDetailsDTO(authUser));

        }catch(UserNotFound e){
            return ResponseEntity.notFound().build();//body(new ErrorDTO(e.getMessage()));//.body(new ErrorDTO(e.toString())); 
       }catch(IOException|URISyntaxException e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));

       }
    }
    
    @RequestMapping(value = "/api/user/me", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity editUserDetails(@RequestHeader("Authorization") String APIToken, @RequestBody EditUserDetailsDTO edit){
         Set<ConstraintViolation<EditUserDetailsDTO>> constraintViolations = validator.validate( edit );
        if(constraintViolations.isEmpty()){
        try{
                userService.editUserDetails(APIToken, edit.getFullname(),edit.getPassword());
                return ResponseEntity.ok().body(null);
        }catch(IOException | URISyntaxException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(ProfileNotFoundException e){
            return ResponseEntity.notFound().build();//
        }
        }else{
           ErrorMapDTO temp = new ErrorMapDTO();
           for(ConstraintViolation<EditUserDetailsDTO> cv: constraintViolations){
              temp.addError(((PathImpl)cv.getPropertyPath()).getLeafNode().getName(), cv.getMessage());
              
           }
          return ResponseEntity.badRequest().body(temp);
       }
       
    }
    
   
    /*
    @RequestMapping(value = "/api/auth", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity loginUser(@RequestBody LoginDetailsDTO user){
        try{
            String token = userService.loginUser()
            return ResponseEntity.ok().body(new TokenDTO(token)); 
        }catch(UserNotFound e){
           return ResponseEntity.badRequest().body(new ErrorDTO(e.toString()));
        }
    }
    
    private ResponseEntity authenticateUser(@)
    
    @RequestMapping(value = "/api/auth", method = RequestMethod.DELETE)
    public ResponseEntity logoutUser(@RequestBody LoginDetailsDTO user){
        try{
            userService.logoutUser()
            return ResponseEntity.ok().body(null)); 
        }catch(UserNotLogged e){
           return ResponseEntity.badRequest().body(new ErrorDTO(e.toString()));
        }
    }*/
    
    //@RequestMapping(value = )
    //DIREI DI FARE 3 CONTROLLER: USER + CAMPAIGN + TASK
    // /api/user <- Registrazione
    // /api/auth <- Login
    // /api/user/me <- info + edit
    // /api/campaign <- prendi lista campagne + crea +
    // /api/campaign/{id-Campaign} <- get info campagna + edit 
    // /api/campaign/{id-Campaign}/statistics <- statistiche campagna terminata
    // /api/campaign/{id-Campaign}/image <- get lista immagini + add
    // /api/campaign/{id-Campaign}/image/{id-image} <- delete immagine
    // /api/campaign/{id-Campaign}/image/{id-image}/statistics <- stat immagini (annotazioni + selection)
    // /api/campaign/[id-Campaign}/worker <- get workers
    // /api/campaign/{id-CAmpaign}/worker/{id-worker} <- info worker?
    // /api/campaign/[id-Campaign}/worker/{id-worker}/selection
    // .../annotation
    // /api/campaign/{id-Campaign}/execution per start/terminate
    // /api/campaign/{id-campaign}/statistics
    // /api/task/[id-task)
    // /api/task/(id-task)/session <- sia per sessione che nexttask
      // /api/task/(id-task)/statistics
    
    
}
