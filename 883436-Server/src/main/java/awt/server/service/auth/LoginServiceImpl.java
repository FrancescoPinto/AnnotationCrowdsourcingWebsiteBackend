package awt.server.service.auth;


import awt.server.dto.LoginDetailsDTO;
import awt.server.exceptions.FailedToLoginException;
import awt.server.model.User;
import awt.server.model.Worker;
import awt.server.respository.InvalidTokenRepository;
import awt.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import awt.server.service.auth.ProfileService;
import awt.server.service.TaskService;

import org.springframework.transaction.annotation.Transactional;

@Service

public class LoginServiceImpl implements LoginService {

    @Autowired
    private ProfileService profileService;

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

    public User login(LoginDetailsDTO credentials) {
        User temp =  profileService.get(credentials.getUsername());
                
        if(temp == null)
            throw new FailedToLoginException("Wrong username and/or password");
        
        if(temp.getPassword().equals(credentials.getPassword()))
            return temp;
        else
            return null; 
    }
    
    public void logout(User u, String apitoken){
       
        jwtService.logoutToken(apitoken,u.getUsername());
        if(u instanceof Worker){
            taskService.beforeLogoutCleaning(u);
        }
    }
    
     public void loginToken(String username){
       
       invalidTokenRepository.loginToken(username);
    }
    //NEL LOGOUT ANNULLA LE TASK WORKING SESSION APERTE DALL'UTENTE!!
}
