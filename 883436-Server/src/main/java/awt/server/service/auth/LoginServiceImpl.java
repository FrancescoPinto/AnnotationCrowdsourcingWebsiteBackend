package awt.server.service.auth;


import awt.server.dto.LoginDetailsDTO;
import awt.server.exceptions.FailedToLoginException;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.InvalidTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import awt.server.service.TaskService;
import awt.server.service.UserService;

import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation=Propagation.REQUIRED)
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private JwtService jwtService;
    
    
    @Autowired
    private InvalidTokenRepository invalidTokenRepository;

   /* @SuppressWarnings("unused")
    public LoginServiceImpl() {
        this(null);
    }*/

    /*@Autowired
    public LoginServiceImpl(ProfileService profileService) {
        this.profileService = profileService;
    }*/

    @Override
    public String login(LoginDetailsDTO credentials) throws IOException,URISyntaxException{
        User temp =  userService.findByUsername(credentials.getUsername());
                
        if(temp == null)
            throw new FailedToLoginException("Wrong username and/or password");
        
        
        
        if(temp.getPassword().equals(credentials.getPassword())){
            System.out.println("Sto per chiamare il loginToken");
            loginToken(temp.getUsername());
            System.out.println("Sto per creare il token");
            return jwtService.tokenFor(temp);
        }
        else
            return null; 

    }
    
    @Override
    public void logout(String apitoken) throws IOException,URISyntaxException{
       User u = userService.getUser(apitoken);
        jwtService.logoutToken(apitoken,u.getUsername());
        if(u instanceof Worker){
            taskService.beforeLogoutCleaning(apitoken);
        }
    }
    
    @Override
     public void loginToken(String username){
       
       invalidTokenRepository.loginToken(username);
    }
    //NEL LOGOUT ANNULLA LE TASK WORKING SESSION APERTE DALL'UTENTE!!
}
