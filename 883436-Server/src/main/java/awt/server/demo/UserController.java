/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.demo;

import awt.server.dto.RegistrationDetailsDTO;
import awt.server.model.Master;
import awt.server.model.Worker;
import awt.server.service.UserService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    
    @RequestMapping(value = "/api/user", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity registerUser(@Valid @RequestBody RegistrationDetailsDTO user){
        
        //try{
            if(user.getType().equals("master")){
                Master tempUser = new Master(user);
                 userService.registerUser(tempUser);
            }else{
                Worker tempUser = new Worker(user);
                 userService.registerUser(tempUser);
            }
           
            return ResponseEntity.ok().body(null);
        //}catch(UserCreationException e){
         //   return ResponseEntity.badRequest().body(new ErrorDTO(e.toString()));
        //}   
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
